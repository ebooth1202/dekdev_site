from pydantic import BaseModel, EmailStr, validator
from typing import Optional
import re

class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = ""
    message: str

    @validator('name')
    def name_must_not_be_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('Name cannot be empty')
        if len(v.strip()) < 2:
            raise ValueError('Name must be at least 2 characters long')
        if len(v.strip()) > 100:
            raise ValueError('Name must be less than 100 characters')
        return v.strip()

    @validator('message')
    def message_must_not_be_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('Message cannot be empty')
        if len(v.strip()) < 10:
            raise ValueError('Message must be at least 10 characters long')
        if len(v.strip()) > 2000:
            raise ValueError('Message must be less than 2000 characters')
        return v.strip()

    @validator('subject')
    def subject_validation(cls, v):
        if v and len(v.strip()) > 200:
            raise ValueError('Subject must be less than 200 characters')
        return v.strip() if v else ""

    @validator('email')
    def email_validation(cls, v):
        # Additional email validation beyond pydantic's EmailStr
        if len(str(v)) > 254:
            raise ValueError('Email address is too long')
        return v

class ContactResponse(BaseModel):
    success: bool
    message: str
    timestamp: str

class ContactError(BaseModel):
    success: bool = False
    message: str
    error_code: Optional[str] = None