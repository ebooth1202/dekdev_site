from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    # Email Configuration
    smtp_host: str = "smtp.gmail.com"
    smtp_port: int = 587
    smtp_username: str
    smtp_password: str
    email_from: str
    email_to: str

    # OpenAI Configuration
    openai_api_key: str
    openai_model: str = "gpt-3.5-turbo"
    openai_max_tokens: int = 500
    openai_temperature: float = 0.7

    # API Configuration
    frontend_url: str = "http://localhost:3000"
    api_host: str = "0.0.0.0"
    api_port: int = int(os.environ.get("PORT", 8000))  # Heroku sets PORT

    # Security - Updated for production
    allowed_origins: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://dekdevs.com",
        "https://www.dekdevs.com"
    ]

    # Rate limiting (requests per minute)
    rate_limit_per_minute: int = 5
    chat_rate_limit_per_minute: int = 10

    # Environment
    environment: str = os.environ.get("ENVIRONMENT", "development")
    debug: bool = os.environ.get("DEBUG", "false").lower() == "true"

    class Config:
        env_file = ".env"
        case_sensitive = False


# Global settings instance
settings = Settings()


# Validation function to check required settings
def validate_email_settings():
    """Validate that all required email settings are provided"""
    required_fields = [
        'smtp_username',
        'smtp_password',
        'email_from',
        'email_to'
    ]

    missing_fields = []
    for field in required_fields:
        if not getattr(settings, field):
            missing_fields.append(field.upper())

    if missing_fields:
        raise ValueError(
            f"Missing required environment variables: {', '.join(missing_fields)}. "
            f"Please check your .env file."
        )

    return True