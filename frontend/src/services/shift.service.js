import axios from "axios";

export const startShift = async () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("No se encontró un token válido en el almacenamiento de sesión.");
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/shifts/start`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al iniciar el turno.");
  }
};

export const endShift = async () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("No se encontró un token válido en el almacenamiento de sesión.");
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/shifts/end`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al finalizar el turno.");
  }
};
