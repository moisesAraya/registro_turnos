import React, { useState } from "react";
import axios from "axios";
import "../styles/earlyExit.css";

const EarlyExit = ({ user }) => {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleEarlyExit = async () => {
    setError("");
    setSuccess("");

    if (!reason.trim()) {
      setError("Por favor, especifica el motivo de salida.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/earlyexit`,
        {
          user_id: user.id,
          reason,
        }
      );

      setSuccess(response.data.message);
      setReason(""); 
    } catch (err) {
      console.error("Error al registrar salida:", err);
      setError("Error al registrar la salida temprana.");
    }
  };

  return (
    <div className="early-exit-container">
      <h2 className="early-exit-title">Registrar Salida Temprana</h2>
      <textarea
        placeholder="Especifica el motivo de la salida..."
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="early-exit-textarea"
      ></textarea>
      <button onClick={handleEarlyExit} className="early-exit-button">
        Registrar salida
      </button>
      {error && <p className="early-exit-error">{error}</p>}
      {success && <p className="early-exit-success">{success}</p>}
    </div>
  );
};

export default EarlyExit;
