import React, { useState } from "react";
import { startShift, endShift } from "../services/shift.service";

const ShiftsPage = () => {
  const [shiftActive, setShiftActive] = useState(false);

  // Iniciar Turno
  const handleStartShift = async () => {
    try {
      const response = await startShift();
      alert(response.message);
      setShiftActive(true);
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
    } catch (error) {
      console.error("Error al finalizar turno:", error.message || error);
    }
  };

  return (
    <div>
      <h1>Administrar Turnos</h1>
      <button onClick={handleStartShift} disabled={shiftActive}>
        Iniciar Turno
      </button>
      <button onClick={handleEndShift} disabled={!shiftActive}>
        Finalizar Turno
      </button>
    </div>
  );
};

export default ShiftsPage;
