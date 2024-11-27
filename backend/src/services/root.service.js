// src/services/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.HOST.PORT}`, // URL base de tu backend
});

export default axiosInstance;
