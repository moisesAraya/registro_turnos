// src/services/attendance.service.js
import axios from "axios";

export const registerAttendance = async (userId, latitude, longitude, shiftId) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/attendance`, {
      user_id: userId,
      latitude,
      longitude,
      shift_id: shiftId, 
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Error al registrar la asistencia.");
  }
};
