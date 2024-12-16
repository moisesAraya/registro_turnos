import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

// Función auxiliar para obtener el token
const getAuthHeader = () => {
  const token = sessionStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const getEvents = async () => {
  const response = await axios.get(`${baseURL}/events`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await axios.post(`${baseURL}/events/create`, eventData, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const updateEvent = async (id, eventData) => {
  const response = await axios.put(`${baseURL}/events/${id}`, eventData, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const deleteEvent = async (id) => {
  const response = await axios.delete(`${baseURL}/events/${id}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};
