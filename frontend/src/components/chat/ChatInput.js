// src/components/chat/ChatInput.js
import React, { useState } from 'react';
import './ChatInput.css';

const ChatInput = ({ onSendMessage, disabled, suggestedQuestions = [] }) => {
  const [message, setMessage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
      setShowSuggestions(false); // Hide suggestions after first message
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (!disabled) {
      onSendMessage(suggestion);
      setShowSuggestions(false); // Hide suggestions after clicking one
    }
  };

  return (
    <div className="chat-input-container">
      {message === '' && showSuggestions && suggestedQuestions.length > 0 && (
        <div className="suggested-questions">
          <p className="suggestions-title">Try asking:</p>
          <div className="suggestions-list">
            {suggestedQuestions.slice(0, 4).map((question, index) => (
              <button
                key={index}
                className="suggestion-btn"
                onClick={() => handleSuggestionClick(question)}
                disabled={disabled}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="chat-form">
        <div className="input-wrapper">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about Ethan..."
            disabled={disabled}
            rows="1"
            className="message-input"
          />
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className="send-button"
            title="Send message"
          >
            <span className="send-icon">➤</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;