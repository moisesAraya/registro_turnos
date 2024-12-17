import React, { useState } from "react";
import { startShift, endShift } from "../services/shift.service";
import "../styles/shiftspage.css";

const ShiftsPage = () => {
  const [shiftActive, setShiftActive] = useState(false);
  const [shiftType, setShiftType] = useState(""); // Guarda el tipo de turno (mañana/tarde)

  const determineShiftType = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 10 && currentHour < 18) {
      return "mañana";
    } else if (currentHour >= 18 && currentHour <= 23) {
      return "tarde";
    } else {
      return "fuera de horario"; // Opcional: Si la hora no entra en los rangos
    }
  };

  // Iniciar Turno
  const handleStartShift = async () => {
    try {
      const response = await startShift();
      alert(response.message);
      setShiftActive(true);
      setShiftType(determineShiftType()); // Determinar el tipo de turno al iniciarlo
    } catch (error) {
      console.error("Error al iniciar turno:", error.message || error);
    }
  };

  // Finalizar Turno
  const handleEndShift = async () => {
    try {
      const response = await endShift();
      alert(response.message);
      setShiftActive(false);
      setShiftType(""); // Limpiar el tipo de turno al finalizar
    } catch (error) {
      console.error("Error al finalizar turno:", error.message || error);
    }
  };

  return (
    <div className="shifts-container">
      <h1 className="shifts-title">Shift Management</h1>
      <div className="shift-status">
        <span className="shift-status-icon">✔</span>
        <p>
          {shiftActive
            ? `Turno de ${shiftType} activo`
            : "No hay turno activo"}
        </p>
      </div>
      <div className="buttons-container">
        <button
          className={`shift-button start ${shiftActive ? "disabled" : ""}`}
          onClick={handleStartShift}
          disabled={shiftActive}
        >
          ▶ Start Shift
        </button>
        <button
          className={`shift-button end ${!shiftActive ? "disabled" : ""}`}
          onClick={handleEndShift}
          disabled={!shiftActive}
        >
          ⏹ End Shift
        </button>
      </div>
    </div>
  );
};

export default ShiftsPage;
