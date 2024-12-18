import axios from "axios";

export const registerAttendance = async (userId, shiftId) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/attendance`,
      {
        user_id: userId,
        shift_id: shiftId, // Eliminamos latitud y longitud
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Error al registrar la asistencia.");
  }
};
