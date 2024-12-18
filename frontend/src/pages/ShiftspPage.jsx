import React, { useState, useEffect } from "react";
import { startShift, endShift } from "../services/shift.service";
import "../styles/shiftspage.css";

const ShiftsPage = () => {
  const [shiftActive, setShiftActive] = useState(false);
  const [shiftType, setShiftType] = useState("");
  const [shiftId, setShiftId] = useState(null);

  const determineShiftType = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 10 && currentHour < 18) {
      return "mañana";
    } else if (currentHour >= 18 && currentHour <= 23) {
      return "tarde";
    } else {
      return "fuera de horario";
    }
  };

  useEffect(() => {
    const savedShift = localStorage.getItem("activeShift");
    if (savedShift) {
      const shiftData = JSON.parse(savedShift);
      setShiftActive(true);
      setShiftType(shiftData.shiftType || determineShiftType());
      setShiftId(shiftData.shift_id || null);
    }
  }, []);

  const handleStartShift = async () => {
    try {
      const response = await startShift();
      if (response && response.id) {
        const shiftType = determineShiftType();
        setShiftActive(true);
        setShiftType(shiftType);
        setShiftId(response.id);

        localStorage.setItem(
          "activeShift",
          JSON.stringify({ shiftType, shift_id: response.id })
        );
      } else {
        throw new Error("No se recibió un ID válido del turno.");
      }
    } catch (error) {
      console.error("Error al iniciar turno:", error.message || error);
      alert(error.message || "Error al iniciar turno.");
    }
  };

  const handleEndShift = async () => {
    try {
      const response = await endShift();
      alert(response.message);
      setShiftActive(false);
      setShiftType("");
      setShiftId(null);

      localStorage.removeItem("activeShift");
    } catch (error) {
      console.error("Error al finalizar turno:", error.message || error);
    }
  };

  return (
    <div className="shifts-container">
      <h1 className="shifts-title">Gestión de Turnos</h1>
      <div className="shift-status">
        <span className="shift-status-icon">✔</span>
        <p>
          {shiftActive
            ? `Turno de ${shiftType} activo (ID: ${shiftId})`
            : "No hay turno activo"}
        </p>
      </div>
      <div className="buttons-container">
        <button
          className={`shift-button start ${shiftActive ? "disabled" : ""}`}
          onClick={handleStartShift}
          disabled={shiftActive}
        >
          ▶ Iniciar Turno
        </button>
        <button
          className={`shift-button end ${!shiftActive ? "disabled" : ""}`}
          onClick={handleEndShift}
          disabled={!shiftActive}
        >
          ⏹ Finalizar Turno
        </button>
      </div>
    </div>
  );
};

export default ShiftsPage;
