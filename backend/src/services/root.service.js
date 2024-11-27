import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.HOST, 
});

export default axiosInstance;
