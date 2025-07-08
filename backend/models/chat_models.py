from pydantic import BaseModel, validator
from typing import List, Optional
from datetime import datetime

class ChatMessage(BaseModel):
    role: str  # 'user' or 'assistant'
    content: str
    timestamp: Optional[datetime] = None

    @validator('role')
    def validate_role(cls, v):
        if v not in ['user', 'assistant', 'system']:
            raise ValueError('Role must be user, assistant, or system')
        return v

    @validator('content')
    def validate_content(cls, v):
        if not v or not v.strip():
            raise ValueError('Message content cannot be empty')
        if len(v) > 4000:
            raise ValueError('Message content too long (max 4000 characters)')
        return v.strip()

class ChatRequest(BaseModel):
    message: str
    conversation_history: Optional[List[ChatMessage]] = []

    @validator('message')
    def validate_message(cls, v):
        if not v or not v.strip():
            raise ValueError('Message cannot be empty')
        if len(v) > 1000:
            raise ValueError('Message too long (max 1000 characters)')
        return v.strip()

    @validator('conversation_history')
    def validate_history(cls, v):
        if len(v) > 20:  # Limit conversation history to prevent context overflow
            # Keep only the most recent 20 messages
            return v[-20:]
        return v

class ChatResponse(BaseModel):
    message: str
    timestamp: datetime
    conversation_id: Optional[str] = None

class ChatError(BaseModel):
    error: str
    error_code: str
    timestamp: datetime