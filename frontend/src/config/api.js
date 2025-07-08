
// API configuration for different environments
const API_BASE_URL = process.env.REACT_APP_API_URL || '';

export const API_ENDPOINTS = {
  contact: `${API_BASE_URL}/api/contact`,
  chat: `${API_BASE_URL}/api/chat`,
  chatSuggestions: `${API_BASE_URL}/api/chat/suggestions`,
  chatHealth: `${API_BASE_URL}/api/chat/health`,
  contactHealth: `${API_BASE_URL}/api/contact/health`
};

export default API_BASE_URL;