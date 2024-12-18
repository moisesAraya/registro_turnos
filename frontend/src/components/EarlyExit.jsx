import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/earlyExit.css";

const EarlyExit = ({ user }) => {
  const [showExitModal, setShowExitModal] = useState(false);
  const [exitReason, setExitReason] = useState("");
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/admins`, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
        });
        setAdmins(response.data);
      } catch (err) {
        console.error("Error al obtener lista de administradores:", err);
        setError("Error al cargar administradores.");
      }
    };

    fetchAdmins();
  }, []);

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

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/attendance/early_exit`,
        {
          user_id: user.id,
          shift_id: shift_id,
          exit_reason: exitReason,
          authorized_by: selectedAdmin,
        },
        {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
        }
      );

      if (response.data.success) {
        setSuccess("Salida temprana registrada exitosamente.");
        setShowExitModal(false);
      } else {
        setError("Error al registrar la salida temprana.");
      }
    } catch (err) {
      console.error("Error al registrar salida temprana:", err.message || err);
      setError(err.response?.data?.message || "Error al registrar la salida temprana.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="early-exit-container">
      <button onClick={() => setShowExitModal(true)} className="early-exit-button">
        Registrar salida temprana
      </button>

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
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default EarlyExit;
