// src/controllers/shifts.controller.js
import { endShiftService, startShiftService, getActiveShiftForUser } from "../services/Shift.service.js";
import { handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";

// Controlador para iniciar turno
export const startShift = async (req, res) => {
  try {
    const user = req.user;
    const [shift, error] = await startShiftService(user);
    if (error) return res.status(500).json({ message: error });
    return handleSuccess(res, 201, "Turno iniciado exitosamente", shift);
  } catch (error) {
    console.error("Error al iniciar turno:", error.message);
    return handleErrorServer(res, 500, "Error interno al iniciar el turno.");
  }
};

// Controlador para terminar turno
export const endShift = async (req, res) => {
  try {
    const user = req.user;
    const [shift, error] = await endShiftService(user);
    if (error) return res.status(500).json({ message: error });
    return handleSuccess(res, 200, "Turno terminado exitosamente", shift);
  } catch (error) {
    console.error("Error al terminar turno:", error.message);
    return handleErrorServer(res, 500, "Error interno al terminar el turno.");
  }
};

// Controlador para obtener turno activo
export const getActiveShifts = async (req, res) => {
  try {
    const user = req.user;
    const [shift, error] = await getActiveShiftForUser(user);
    if (error) return res.status(404).json({ message: error });
    return handleSuccess(res, 200, "Turno activo obtenido", { shift_id: shift.id });
  } catch (error) {
    console.error("Error al obtener el turno activo:", error.message);
    return handleErrorServer(res, 500, "Error interno al obtener el turno activo.");
  }
};
