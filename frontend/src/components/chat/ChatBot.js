// src/components/chat/ChatBot.js
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import './ChatBot.css';
import { API_ENDPOINTS } from '../../config/api';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Ethan's AI assistant. Ask me anything about his background, experience, or projects!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load suggested questions when component mounts
  useEffect(() => {
    loadSuggestedQuestions();
  }, []);

  const loadSuggestedQuestions = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.chatSuggestions);
      if (response.ok) {
        const data = await response.json();
        setSuggestedQuestions(data.suggestions || []);
      }
    } catch (error) {
      console.error('Failed to load suggested questions:', error);
      // Fallback to default suggestions
      setSuggestedQuestions([
        "What's Ethan's background?",
        "Tell me about his projects",
        "What are his technical skills?",
        "How did he transition from nursing to tech?"
      ]);
    }
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Prepare conversation history (last 10 messages to stay within context limits)
      const conversationHistory = messages.slice(-10).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      // Call backend AI service
      const response = await fetch(API_ENDPOINTS.chat, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          conversation_history: conversationHistory
        }),
      });

      if (response.ok) {
        const result = await response.json();

        const botResponse = {
          id: Date.now() + 1,
          text: result.message,
          sender: 'bot',
          timestamp: new Date(result.timestamp)
        };

        setMessages(prev => [...prev, botResponse]);

      } else {
        // Handle API errors
        const errorData = await response.json();
        let errorMessage = "Sorry, I'm having trouble responding right now. Please try again.";

        if (response.status === 429) {
          errorMessage = "I'm getting a lot of requests right now. Please wait a moment and try again.";
        } else if (errorData.detail) {
          errorMessage = errorData.detail;
        }

        const errorResponse = {
          id: Date.now() + 1,
          text: errorMessage,
          sender: 'bot',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, errorResponse]);
      }

    } catch (error) {
      console.error('Chat error:', error);

      // Network error fallback
      const fallbackResponse = {
        id: Date.now() + 1,
        text: "I'm having connection issues. Please check your internet connection and try again.",
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const clearChat = () => {
    setMessages([{
      id: 1,
      text: "Hi! I'm Ethan's AI assistant. Ask me anything about his background, experience, or projects!",
      sender: 'bot',
      timestamp: new Date()
    }]);
  };

  return (
    <>
      <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-info">
            <div className="bot-avatar">🤖</div>
            <div className="bot-details">
              <h3>Ethan's AI Assistant</h3>
              <span className="status online">Online</span>
            </div>
          </div>
          <div className="chatbot-controls">
            <button className="control-btn" onClick={clearChat} title="Clear chat">
              🗑️
            </button>
            <button className="control-btn" onClick={toggleChat} title="Close chat">
              ✖️
            </button>
          </div>
        </div>

        <div className="chatbot-messages">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping && (
            <div className="typing-indicator">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="typing-text">Ethan's AI is typing...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isTyping}
          suggestedQuestions={suggestedQuestions}
        />
      </div>

      <button
        className={`chatbot-toggle ${isOpen ? 'hidden' : ''}`}
        onClick={toggleChat}
        title="Chat with Ethan's AI"
      >
        <span className="toggle-icon">💬</span>
        <span className="toggle-text">Ask AI about Ethan</span>
      </button>
    </>
  );
};

export default ChatBot;