import axios from "axios";

// Función para registrar la asistencia
export const registerAttendance = async (userId, latitude, longitude) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/attendance/register`, // URL desde variable de entorno
      {
        userId,
        latitude,
        longitude,
        timestamp: new Date().toISOString(), // Agregar timestamp si es necesario
      }
    );

    // Devuelve la respuesta del servidor
    return response.data; // Asegúrate de que esto contenga la estructura esperada
  } catch (error) {
    console.error("Error al registrar entrada:", error.response?.data || error.message);
    throw error; // Lanza el error para que pueda ser manejado en el componente
  }
};