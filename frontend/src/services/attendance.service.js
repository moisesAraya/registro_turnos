import axios from "axios";

export const registerAttendance = async () => {
  if (!navigator.geolocation) {
    alert("La geolocalización no está soportada en este navegador.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/attendance/register`, // URL desde variable de entorno
          {
            latitude,
            longitude,
            userId: JSON.parse(sessionStorage.getItem("usuario")).rut, // Usa el usuario actual
          }
        );
        alert(response.data.message);
      } catch (error) {
        console.error(
          "Error al registrar entrada:",
          error.response?.data || error.message
        );
        alert(error.response?.data?.message || "Error al registrar entrada.");
      }
    },
    (error) => {
      console.error("Error obteniendo geolocalización:", error.message);
      alert("Error al obtener geolocalización.");
    }
  );
};
