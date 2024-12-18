import React, { useState, useEffect } from "react";
import "../styles/attendance.css";
import { registerAttendance, registerEarlyExit } from "../services/attendance.service";
import AreaSelectionModal from "./AreaSelectionModal";
import axios from "axios";

const Attendance = ({ user }) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showAreaModal, setShowAreaModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const [exitReason, setExitReason] = useState("");

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/admins`, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
        });
        setAdmins(response.data);
      } catch (err) {
        console.error("Error al obtener lista de administradores:", err);
      }
    };

    fetchAdmins();
  }, []);

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
      const shift_id = activeShift.shift_id;

      if (!shift_id) {
        setError("No tienes un turno activo para registrar la asistencia.");
        setIsLoading(false);
        return;
      }

      const response = await registerAttendance(user.id, shift_id);

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

  const handleRegisterEarlyExit = async () => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      if (!exitReason || !selectedAdmin) {
        setError("Por favor completa todos los campos.");
        setIsLoading(false);
        return;
      }

      const activeShiftString = localStorage.getItem("activeShift");
      const activeShift = JSON.parse(activeShiftString);
      const shift_id = activeShift?.shift_id;

      if (!shift_id) {
        setError("No tienes un turno activo para registrar la salida.");
        setIsLoading(false);
        return;
      }

      const response = await registerEarlyExit(user.id, shift_id, exitReason, selectedAdmin);

      if (response.success) {
        setSuccess("Salida temprana registrada exitosamente.");
        setShowExitModal(false);
      } else {
        setError("Error al registrar la salida temprana.");
      }
    } catch (err) {
      console.error("Error al registrar salida temprana:", err.message || err);
      setError(err.message || "Error al registrar la salida temprana.");
    } finally {
      setIsLoading(false);
    }
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

      <button
        onClick={() => setShowExitModal(true)}
        className="exit-button"
        disabled={isLoading}
      >
        Registrar salida temprana
      </button>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      {showAreaModal && (
        <AreaSelectionModal
          userId={user.id}
          onClose={() => setShowAreaModal(false)}
          onSubmit={() => setShowAreaModal(false)}
        />
      )}

      {showExitModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Registrar salida temprana</h2>
            <label>Motivo:</label>
            <textarea
              value={exitReason}
              onChange={(e) => setExitReason(e.target.value)}
              placeholder="Describe el motivo de la salida..."
            ></textarea>
            <label>Administrador que autorizó:</label>
            <select
              value={selectedAdmin}
              onChange={(e) => setSelectedAdmin(e.target.value)}
            >
              <option value="">Selecciona un administrador</option>
              {admins.map((admin) => (
                <option key={admin.id} value={admin.id}>
                  {admin.name}
                </option>
              ))}
            </select>
            <div className="modal-buttons">
              <button onClick={handleRegisterEarlyExit} disabled={isLoading}>
                Registrar salida
              </button>
              <button onClick={() => setShowExitModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;