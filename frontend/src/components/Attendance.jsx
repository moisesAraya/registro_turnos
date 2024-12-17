// src/components/Attendance.jsx
import React, { useState, useEffect } from "react";
import "../styles/attendance.css";
import { registerAttendance } from "../services/attendance.service";
import axios from "axios";

const Attendance = ({ user }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shiftId, setShiftId] = useState(null); // Estado para almacenar el shift_id

  // Función para obtener el turno activo
  const fetchActiveShift = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/shifts/active`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Asegúrate de que el token esté presente
        },
      });

      if (response.data && response.data.shift_id) {
        setShiftId(response.data.shift_id);
      } else {
        setError("No tienes un turno activo.");
      }
    } catch (err) {
      console.error("Error al obtener el turno activo:", err);
      setError("Error al obtener el turno activo.");
    }
  };

  // Llamamos a la función fetchActiveShift cuando el componente se monta
  useEffect(() => {
    fetchActiveShift();
  }, [user.id]);

  // Manejo del registro de asistencia
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

        // Verificamos si el shift_id está disponible
        if (!shiftId) {
          setError("No tienes un turno activo para registrar la asistencia.");
          setIsLoading(false);
          return;
        }

        try {
          const response = await registerAttendance(
            user.id, // ID del usuario
            latitude,
            longitude,
            shiftId // Enviamos el shift_id
          );

          console.log("Respuesta del servidor:", response);

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
