import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from typing import Dict, Any
from config.settings import settings
from models.contact_models import ContactRequest

logger = logging.getLogger(__name__)


class EmailService:
    def __init__(self):
        self.smtp_host = settings.smtp_host
        self.smtp_port = settings.smtp_port
        self.smtp_username = settings.smtp_username
        self.smtp_password = settings.smtp_password
        self.email_from = settings.email_from
        self.email_to = settings.email_to

    def create_email_content(self, contact_data: ContactRequest) -> Dict[str, str]:
        """Create both HTML and plain text versions of the email"""

        # Plain text version
        text_content = f"""
New Contact Form Submission

From: {contact_data.name}
Email: {contact_data.email}
Subject: {contact_data.subject or 'No subject provided'}

Message:
{contact_data.message}

---
Sent from your portfolio website contact form
Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""

        # HTML version
        html_content = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Contact Form Submission</title>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background-color: #f4f4f4; padding: 20px; border-radius: 5px; margin-bottom: 20px; }}
        .content {{ background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }}
        .field {{ margin-bottom: 15px; }}
        .label {{ font-weight: bold; color: #555; }}
        .message-content {{ background-color: #f9f9f9; padding: 15px; border-left: 4px solid #007bff; margin-top: 10px; }}
        .footer {{ margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>New Contact Form Submission</h2>
        </div>

        <div class="content">
            <div class="field">
                <span class="label">Name:</span> {contact_data.name}
            </div>

            <div class="field">
                <span class="label">Email:</span> 
                <a href="mailto:{contact_data.email}">{contact_data.email}</a>
            </div>

            <div class="field">
                <span class="label">Subject:</span> {contact_data.subject or 'No subject provided'}
            </div>

            <div class="field">
                <span class="label">Message:</span>
                <div class="message-content">
                    {contact_data.message.replace(chr(10), '<br>')}
                </div>
            </div>
        </div>

        <div class="footer">
            <p>Sent from your portfolio website contact form</p>
            <p>Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
        </div>
    </div>
</body>
</html>
"""

        return {
            "text": text_content.strip(),
            "html": html_content
        }

    async def send_contact_email(self, contact_data: ContactRequest) -> Dict[str, Any]:
        """Send the contact form email"""
        try:
            # Create email content
            email_content = self.create_email_content(contact_data)

            # Create message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f"Portfolio Contact: {contact_data.subject or 'New Message from ' + contact_data.name}"
            msg['From'] = self.email_from
            msg['To'] = self.email_to
            msg['Reply-To'] = contact_data.email

            # Create text and HTML parts
            text_part = MIMEText(email_content['text'], 'plain')
            html_part = MIMEText(email_content['html'], 'html')

            # Attach parts
            msg.attach(text_part)
            msg.attach(html_part)

            # Send email
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_username, self.smtp_password)
                server.send_message(msg)

            logger.info(f"Contact email sent successfully from {contact_data.email}")

            return {
                "success": True,
                "message": "Email sent successfully",
                "timestamp": datetime.now().isoformat()
            }

        except smtplib.SMTPAuthenticationError as e:
            logger.error(f"SMTP Authentication failed: {e}")
            return {
                "success": False,
                "message": "Email configuration error",
                "error_code": "SMTP_AUTH_ERROR"
            }

        except smtplib.SMTPRecipientsRefused as e:
            logger.error(f"Recipients refused: {e}")
            return {
                "success": False,
                "message": "Invalid recipient email",
                "error_code": "RECIPIENTS_REFUSED"
            }

        except smtplib.SMTPException as e:
            logger.error(f"SMTP error occurred: {e}")
            return {
                "success": False,
                "message": "Failed to send email",
                "error_code": "SMTP_ERROR"
            }

        except Exception as e:
            logger.error(f"Unexpected error sending email: {e}")
            return {
                "success": False,
                "message": "An unexpected error occurred",
                "error_code": "UNKNOWN_ERROR"
            }

    async def send_confirmation_email(self, contact_data: ContactRequest) -> Dict[str, Any]:
        """Send a confirmation email to the person who submitted the form"""
        try:
            # Create confirmation message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = "Thank you for contacting DekDev"
            msg['From'] = self.email_from
            msg['To'] = contact_data.email

            # Confirmation content
            text_content = f"""
Hi {contact_data.name},

Thank you for reaching out! I've received your message and will get back to you as soon as possible.

Your message:
"{contact_data.message[:200]}{'...' if len(contact_data.message) > 200 else ''}"

Best regards,
Ethan Booth
DekDev
"""

            html_content = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ text-align: center; margin-bottom: 30px; }}
        .content {{ background-color: #f9f9f9; padding: 20px; border-radius: 5px; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Thank you for contacting DekDev!</h2>
        </div>

        <div class="content">
            <p>Hi {contact_data.name},</p>

            <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>

            <p><strong>Your message:</strong></p>
            <p>"{contact_data.message[:200]}{'...' if len(contact_data.message) > 200 else ''}"</p>

            <p>Best regards,<br>
            Ethan Booth<br>
            DekDev</p>
        </div>
    </div>
</body>
</html>
"""

            # Create text and HTML parts
            text_part = MIMEText(text_content.strip(), 'plain')
            html_part = MIMEText(html_content, 'html')

            msg.attach(text_part)
            msg.attach(html_part)

            # Send confirmation email
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_username, self.smtp_password)
                server.send_message(msg)

            logger.info(f"Confirmation email sent to {contact_data.email}")
            return {"success": True, "message": "Confirmation email sent"}

        except Exception as e:
            logger.error(f"Failed to send confirmation email: {e}")
            # Don't fail the main request if confirmation email fails
            return {"success": False, "message": "Failed to send confirmation"}


# Global email service instance
email_service = EmailService()