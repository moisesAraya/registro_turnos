// attendance.service.js
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
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/attendance/register`,
      {
        user_id: userId,
        shift_id: shiftId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Error al registrar la asistencia.");
  }
<<<<<<< HEAD
};

// Nueva función para registrar salida temprana
export const registerEarlyExit = async (userId, shiftId, reason, authorizedBy) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    throw new Error("No se encontró un token válido en el almacenamiento de sesión.");
  }

  if (!shiftId || !reason || !authorizedBy) {
    throw new Error("Todos los campos son obligatorios para registrar una salida temprana.");
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/attendance/early_exit`,
      {
        user_id: userId,
        shift_id: shiftId,
        reason,
        authorized_by: authorizedBy,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Error al registrar la salida temprana.");
  }
};
=======
};
>>>>>>> 4338fc4f48eab1f923eebab5c8ec4a8320773b6a
