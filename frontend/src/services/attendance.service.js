import axios from "axios";

export const registerAttendance = async (userId, shiftId) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    throw new Error("No se encontró un token válido en el almacenamiento de sesión.");
  }

  if (!shiftId) {
    throw new Error("No se encontró un turno activo en el almacenamiento local.");
  }

  try {
    console.log("Enviando datos al backend:", { userId, shiftId });

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/attendance/register`,
      {
        userId,
        shiftId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error en la solicitud al backend:", err.response?.data || err);
    throw new Error(err.response?.data?.message || "Error al registrar la asistencia.");
  }
};
