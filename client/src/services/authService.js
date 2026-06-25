import axios from "axios";

const API = "https://prepbuddy-ai-interview-platform.onrender.com/api/auth";

// REGISTER
export const registerUser = async (userData) => {
  const response = await axios.post(
    `${API}/register`,
    userData
  );

  return response.data;
};

// LOGIN
export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API}/login`,
    userData
  );

  return response.data;
};