import React, { useState } from "react";
import "../styles/attendance.css";
import { registerAttendance } from "../services/attendance.service";
import AreaSelectionModal from "./AreaSelectionModal";

const Attendance = ({ user }) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showAreaModal, setShowAreaModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterAttendance = async () => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const activeShiftString = localStorage.getItem("activeShift");
      if (!activeShiftString) {
        setError("No se encontró un turno activo en el almacenamiento local.");
        setIsLoading(false);
        return;
      }

      const activeShift = JSON.parse(activeShiftString);
      const shiftId = activeShift.shift_id;

      if (!shiftId) {
        setError("No tienes un turno activo para registrar la asistencia.");
        setIsLoading(false);
        return;
      }

      console.log("Registrando asistencia con:", { userId: user.id, shiftId });

      const response = await registerAttendance(user.id, shiftId);

      if (response.success) {
        setSuccess("Asistencia registrada exitosamente.");
        setShowAreaModal(true);
      } else {
        setError("Error al registrar la asistencia.");
      }
    } catch (err) {
      console.error("Error al registrar asistencia:", err.message || err);
      setError(err.message || "Error al registrar la asistencia.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowAreaModal(false);
  };

  return (
    <div className="attendance-container">
      <h2>Registro de Asistencia</h2>
      <button
        onClick={handleRegisterAttendance}
        className="attendance-button"
        disabled={isLoading}
      >
        {isLoading ? "Registrando..." : "Registrar Ingreso"}
      </button>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      {showAreaModal && (
        <AreaSelectionModal
          userId={user.id}
          onClose={handleModalClose}
          onSubmit={handleModalClose}
        />
      )}
    </div>
  );
};

export default Attendance;
