import React, { useState } from "react";
import "../styles/attendance.css";
import { registerAttendance } from "../services/attendance.service";

const Attendance = ({ user }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterAttendance = () => {
    if (!navigator.geolocation) {
      setError("La geolocalización no está soportada en este navegador.");
      return;
    }

    setError("");
    setSuccess("");
    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await registerAttendance(
            user.id, // ID del usuario
            latitude,
            longitude
          );

          console.log("Respuesta del servidor:", response);

          // Asegúrate de que la respuesta indique éxito
          if (response && response.success) {
            setSuccess("Asistencia registrada exitosamente!");
            setTimeout(() => setSuccess(""), 5000);
          } else {
            setError("Respuesta inesperada del servidor.");
          }
        } catch (err) {
          console.error("Error al registrar el ingreso:", err);
          const errorMessage =
            err.response?.data?.message || "Error desconocido al registrar.";
          setError(errorMessage);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error("Error obteniendo geolocalización:", error.message);
        setError("No se pudo obtener la ubicación.");
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="attendance-container">
      <h2 className="attendance-title">Registrar Ingreso</h2>
      <button
        onClick={handleRegisterAttendance}
        className="attendance-button"
        disabled={isLoading}
      >
        {isLoading ? "Registrando..." : "Registrar mi ingreso"}
      </button>

      {error && <p className="attendance-error">{error}</p>}
      {success && <p className="attendance-success">{success}</p>}
    </div>
  );
};

export default Attendance;