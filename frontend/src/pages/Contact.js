import React, { useEffect, useState } from 'react';
import Analytics from '../services/Analytics';
import './Contact.css';
import { API_ENDPOINTS } from '../config/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Add loading state for better UX
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    Analytics.trackPageView('/contact');
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double submission
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Track analytics before submission (in case of failure)
      Analytics.trackEvent('contact_form_submit_attempt', {
        hasSubject: !!formData.subject,
        messageLength: formData.message.length
      });

      const response = await fetch(API_ENDPOINTS.contact, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // SUCCESS: Reset form and show success message
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });

        // Track successful submission
        Analytics.trackEvent('contact_form_submit_success', formData);

        alert(result.message || 'Thank you for your message! I\'ll get back to you soon.');

      } else {
        // ERROR: Keep form data, show error message
        Analytics.trackEvent('contact_form_submit_error', {
          error: result.detail || 'Unknown error',
          statusCode: response.status
        });

        alert(result.detail || 'Error sending message. Please try again.');
      }

    } catch (error) {
      // NETWORK ERROR: Keep form data, show network error
      console.error('Network error:', error);

      Analytics.trackEvent('contact_form_submit_network_error', {
        error: error.message
      });

      alert('Network error. Please check your connection and try again.');

    } finally {
      // Always re-enable the submit button
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h1>Get In Touch</h1>
          <p>Let's discuss your next project or potential collaboration</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h2>Contact Information</h2>
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <div>
                <h3>Email</h3>
                <p>ebooth@dekdevs.com</p>
              </div>
            </div>

            <div className="contact-item">
              <span className="contact-icon">💼</span>
              <div>
                <h3>LinkedIn</h3>
                <p>https://www.linkedin.com/in/ethan-booth-7bb00499/</p>
              </div>
            </div>

            <div className="contact-item">
              <span className="contact-icon">📂</span>
              <div>
                <h3>GitHub</h3>
                <p>github.com/ebooth1202</p>
              </div>
            </div>

            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div>
                <h3>Charlotte, NC</h3>
                <p>Available for remote work</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Send Message</h2>

            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;