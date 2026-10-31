import axios from 'axios';
import config from './config';

const { API_URL } = config;

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/signup`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'signup');
  }
};

export const login = async (userData) => {
  try {
    const formData = new FormData();
    formData.append('username', userData.username);
    formData.append('password', userData.password);

    const response = await axios.post(`${API_URL}/users/login`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'login');
  }
};

export const generateSong = async (text) => {
  try {
    const response = await axios.post(`${API_URL}/songs/generate`, { text }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'generateSong');
  }
};

export const getChatHistory = async (userId, chatIndex) => {
  try {
    const response = await axios.get(`${API_URL}/song_history/${userId}/${chatIndex}`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'getChatHistory');
  }
};

const handleApiError = (error, context) => {
  if (error.response) {
    if (error.response.status === 429) {
      console.error(`[API ${context} Error] Rate limit exceeded:`, error.response.data);
      alert("Rate limit exceeded, please try again later.");
    } else {
      console.error(`[API ${context} Error] Response data:`, error.response.data);
    }
    throw error.response.data;
  } else if (error.request) {
    console.error(`[API ${context} Error] No response received:`, error.request);
    throw new Error('No response received from server');
  } else {
    console.error(`[API ${context} Error] Request setup:`, error.message);
    throw new Error(`Error in setting up request: ${error.message}`);
  }
};
