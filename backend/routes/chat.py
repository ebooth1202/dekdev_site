from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
from datetime import datetime, timedelta
from typing import Dict, List
import logging
from collections import defaultdict

from models.chat_models import ChatRequest, ChatResponse, ChatError
from services.chat_service import chat_service
from config.settings import settings

logger = logging.getLogger(__name__)

router = APIRouter()

# Simple in-memory rate limiting for chat (use Redis in production)
chat_rate_limit_storage: Dict[str, list] = defaultdict(list)


def check_chat_rate_limit(client_ip: str) -> bool:
    """Check if client has exceeded chat rate limit"""
    now = datetime.now()
    minute_ago = now - timedelta(minutes=1)

    # Clean old entries
    chat_rate_limit_storage[client_ip] = [
        timestamp for timestamp in chat_rate_limit_storage[client_ip]
        if timestamp > minute_ago
    ]

    # Check if under limit
    if len(chat_rate_limit_storage[client_ip]) >= settings.chat_rate_limit_per_minute:
        return False

    # Add current request
    chat_rate_limit_storage[client_ip].append(now)
    return True


@router.post("/chat", response_model=ChatResponse)
async def chat_with_ai(chat_request: ChatRequest, request: Request):
    """Handle chat requests with Ethan's AI assistant"""

    # Get client IP for rate limiting
    client_ip = request.client.host

    # Check rate limit
    if not check_chat_rate_limit(client_ip):
        logger.warning(f"Chat rate limit exceeded for IP: {client_ip}")
        raise HTTPException(
            status_code=429,
            detail="Too many chat requests. Please wait a moment before sending another message."
        )

    try:
        logger.info(f"Processing chat request from {client_ip}: {chat_request.message[:50]}...")

        # Generate AI response
        response = await chat_service.generate_response(chat_request)

        logger.info(f"Chat response generated successfully for {client_ip}")

        return response

    except HTTPException:
        # Re-raise HTTP exceptions
        raise

    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")

        # Return user-friendly error message
        error_response = ChatError(
            error=str(e),
            error_code="CHAT_ERROR",
            timestamp=datetime.now()
        )

        raise HTTPException(
            status_code=500,
            detail=error_response.dict()
        )


@router.get("/chat/suggestions")
async def get_suggested_questions():
    """Get suggested questions for the chat interface"""
    try:
        suggestions = chat_service.get_suggested_questions()
        return {
            "suggestions": suggestions,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Error getting chat suggestions: {e}")
        return JSONResponse(
            status_code=500,
            content={"error": "Failed to load suggestions"}
        )


@router.get("/chat/health")
async def chat_health_check():
    """Health check endpoint for chat service"""
    try:
        # Check if OpenAI API key is configured
        if not settings.openai_api_key:
            return JSONResponse(
                status_code=500,
                content={
                    "status": "unhealthy",
                    "message": "OpenAI API key not configured"
                }
            )

        # Check if knowledge base is loaded
        knowledge_available = bool(chat_service.knowledge_base)

        return {
            "status": "healthy",
            "message": "Chat service is operational",
            "openai_model": settings.openai_model,
            "knowledge_base_loaded": knowledge_available,
            "rate_limit": f"{settings.chat_rate_limit_per_minute} requests/minute"
        }

    except Exception as e:
        logger.error(f"Chat health check failed: {e}")
        return JSONResponse(
            status_code=500,
            content={
                "status": "unhealthy",
                "message": "Chat service error"
            }
        )