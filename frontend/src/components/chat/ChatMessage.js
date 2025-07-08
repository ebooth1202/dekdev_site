// src/components/chat/ChatMessage.js
import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`chat-message ${message.sender}`}>
      <div className="message-container">
        {message.sender === 'bot' && (
          <div className="message-avatar">
            🤖
          </div>
        )}

        <div className="message-content">
          <div className="message-bubble">
            <p>{message.text}</p>
          </div>
          <div className="message-time">
            {formatTime(message.timestamp)}
          </div>
        </div>

        {message.sender === 'user' && (
          <div className="message-avatar user-avatar">
            👤
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;