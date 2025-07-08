import openai
import logging
from pathlib import Path
from datetime import datetime
from typing import List, Dict, Any
from models.chat_models import ChatRequest, ChatResponse, ChatMessage
from config.settings import settings

logger = logging.getLogger(__name__)


class ChatService:
    def __init__(self):
        self.client = openai.OpenAI(api_key=settings.openai_api_key)
        self.knowledge_base = self._load_knowledge_base()
        self.system_prompt = self._create_system_prompt()

    def _load_knowledge_base(self) -> str:
        """Load Ethan's knowledge base from markdown file"""
        try:
            knowledge_file = Path(__file__).parent.parent / "data" / "ethan_knowledge_base.md"
            if knowledge_file.exists():
                return knowledge_file.read_text(encoding='utf-8')
            else:
                logger.warning(f"Knowledge base file not found at {knowledge_file}")
                return "Knowledge base not available."
        except Exception as e:
            logger.error(f"Error loading knowledge base: {e}")
            return "Knowledge base not available."

    def _create_system_prompt(self) -> str:
        """Create the system prompt with Ethan's personality and knowledge"""
        return f"""You are Ethan Booth's AI assistant, helping visitors learn about Ethan's professional background and experience. You have access to detailed information about his career, skills, and achievements.

PERSONALITY & TONE:
- Professional yet friendly and inviting
- Enthusiastic about Ethan's unique background (healthcare to technology)
- Technical expertise when discussing specific skills or technologies
- Conversational and approachable
- Confident but not boastful about achievements

RESPONSE GUIDELINES:
- Always speak about Ethan in third person ("Ethan has experience in..." not "I have experience in...")
- Be specific and detailed when discussing his experience and skills
- Highlight his unique combination of healthcare and technology background
- Mention relevant achievements and certifications when appropriate
- If asked about something not in the knowledge base, be honest but offer to discuss related topics
- Keep responses conversational (2-4 sentences typically, longer for complex questions)
- Use specific examples from his experience when possible

AREAS OF EXPERTISE TO HIGHLIGHT:
- Leadership and project management (especially system implementations)
- Healthcare background (nursing, life flight, critical care)
- Technical skills (Python, React, JavaScript, SQL)
- Agile/Scrum methodologies (Certified Scrum Master)
- Cross-functional team leadership
- System implementations (TMS, CRM, JIRA/Confluence)

KNOWLEDGE BASE:
{self.knowledge_base}

Remember: You're here to help people learn about Ethan's impressive background and how his unique combination of healthcare experience and technical skills makes him a valuable leader and team member."""

    def _prepare_messages(self, chat_request: ChatRequest) -> List[Dict[str, str]]:
        """Prepare messages for OpenAI API call"""
        messages = [{"role": "system", "content": self.system_prompt}]

        # Add conversation history
        for msg in chat_request.conversation_history:
            messages.append({
                "role": msg.role,
                "content": msg.content
            })

        # Add current user message
        messages.append({
            "role": "user",
            "content": chat_request.message
        })

        return messages

    async def generate_response(self, chat_request: ChatRequest) -> ChatResponse:
        """Generate AI response using OpenAI"""
        try:
            messages = self._prepare_messages(chat_request)

            logger.info(f"Generating chat response for message: {chat_request.message[:50]}...")

            response = self.client.chat.completions.create(
                model=settings.openai_model,
                messages=messages,
                max_tokens=settings.openai_max_tokens,
                temperature=settings.openai_temperature,
                top_p=0.9,
                frequency_penalty=0.1,
                presence_penalty=0.1
            )

            ai_message = response.choices[0].message.content.strip()

            logger.info("Chat response generated successfully")

            return ChatResponse(
                message=ai_message,
                timestamp=datetime.now()
            )

        except openai.RateLimitError as e:
            logger.error(f"OpenAI rate limit exceeded: {e}")
            raise Exception("I'm experiencing high demand right now. Please try again in a moment.")

        except openai.AuthenticationError as e:
            logger.error(f"OpenAI authentication error: {e}")
            raise Exception("AI service configuration error. Please try again later.")

        except openai.APIError as e:
            logger.error(f"OpenAI API error: {e}")
            raise Exception("AI service temporarily unavailable. Please try again later.")

        except Exception as e:
            logger.error(f"Unexpected error in chat service: {e}")
            raise Exception("Sorry, I encountered an unexpected error. Please try again.")

    def get_suggested_questions(self) -> List[str]:
        """Return suggested questions for the chat interface"""
        return [
            "What's Ethan's professional background?",
            "Tell me about his healthcare experience",
            "What technical skills does Ethan have?",
            "How did he transition from nursing to technology?",
            "What leadership experience does he have?",
            "What systems has he implemented?",
            "Tell me about his certifications"
        ]


# Global chat service instance
chat_service = ChatService()