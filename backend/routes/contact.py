from fastapi import APIRouter, HTTPException, Request, BackgroundTasks
from fastapi.responses import JSONResponse
from datetime import datetime, timedelta
from typing import Dict
import logging
import asyncio
from collections import defaultdict

from models.contact_models import ContactRequest, ContactResponse, ContactError
from services.email_service import email_service
from config.settings import settings

logger = logging.getLogger(__name__)

router = APIRouter()

# Simple in-memory rate limiting (use Redis in production)
rate_limit_storage: Dict[str, list] = defaultdict(list)


def check_rate_limit(client_ip: str) -> bool:
    """Check if client has exceeded rate limit"""
    now = datetime.now()
    minute_ago = now - timedelta(minutes=1)

    # Clean old entries
    rate_limit_storage[client_ip] = [
        timestamp for timestamp in rate_limit_storage[client_ip]
        if timestamp > minute_ago
    ]

    # Check if under limit
    if len(rate_limit_storage[client_ip]) >= settings.rate_limit_per_minute:
        return False

    # Add current request
    rate_limit_storage[client_ip].append(now)
    return True


@router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(
        contact_data: ContactRequest,
        background_tasks: BackgroundTasks,
        request: Request
):
    """Handle contact form submission"""

    # Get client IP for rate limiting
    client_ip = request.client.host

    # Check rate limit
    if not check_rate_limit(client_ip):
        logger.warning(f"Rate limit exceeded for IP: {client_ip}")
        raise HTTPException(
            status_code=429,
            detail="Too many requests. Please wait before submitting another message."
        )

    try:
        logger.info(f"Processing contact form submission from {contact_data.email}")

        # Send the main contact email
        email_result = await email_service.send_contact_email(contact_data)

        if not email_result["success"]:
            logger.error(f"Failed to send contact email: {email_result}")

            # Return appropriate error based on error code
            if email_result.get("error_code") == "SMTP_AUTH_ERROR":
                raise HTTPException(
                    status_code=500,
                    detail="Email service configuration error. Please try again later."
                )
            else:
                raise HTTPException(
                    status_code=500,
                    detail="Failed to send your message. Please try again later."
                )

        # Send confirmation email in background (don't wait for it)
        background_tasks.add_task(
            email_service.send_confirmation_email,
            contact_data
        )

        logger.info(f"Contact form processed successfully for {contact_data.email}")

        return ContactResponse(
            success=True,
            message="Thank you for your message! I'll get back to you soon.",
            timestamp=datetime.now().isoformat()
        )

    except HTTPException:
        # Re-raise HTTP exceptions
        raise

    except Exception as e:
        logger.error(f"Unexpected error processing contact form: {e}")
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred. Please try again later."
        )


@router.get("/contact/health")
async def contact_health_check():
    """Health check endpoint for contact service"""
    try:
        # Basic validation that email settings are configured
        required_settings = [
            settings.smtp_username,
            settings.smtp_password,
            settings.email_from,
            settings.email_to
        ]

        if not all(required_settings):
            return JSONResponse(
                status_code=500,
                content={
                    "status": "unhealthy",
                    "message": "Email configuration incomplete"
                }
            )

        return {
            "status": "healthy",
            "message": "Contact service is operational",
            "smtp_host": settings.smtp_host,
            "smtp_port": settings.smtp_port,
            "rate_limit": f"{settings.rate_limit_per_minute} requests/minute"
        }

    except Exception as e:
        logger.error(f"Contact health check failed: {e}")
        return JSONResponse(
            status_code=500,
            content={
                "status": "unhealthy",
                "message": "Contact service error"
            }
        )