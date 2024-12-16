import { startShiftService, endShiftService } from "../services/shift.service.js";
import { handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";

// Controlador para iniciar turno
export const startShift = async (req, res) => {
  try {
    const user = req.user; // Usuario autenticado desde el middleware
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
    const user = req.user; // Usuario autenticado desde el middleware
    const [shift, error] = await endShiftService(user);

    if (error) return res.status(500).json({ message: error });

    return handleSuccess(res, 200, "Turno terminado exitosamente", shift);
  } catch (error) {
    console.error("Error al terminar turno:", error.message);
    return handleErrorServer(res, 500, "Error interno al terminar el turno.");
  }
};

// Controlador para obtener turnos activos
export const getActiveShifts = async (req, res) => {
  try {
    const [shifts, error] = await getActiveShiftsService();

    if (error) return res.status(500).json({ message: error });

    return handleSuccess(res, 200, "Turnos activos obtenidos", shifts);
  } catch (error) {
    console.error("Error al obtener turnos activos:", error.message);
    return handleErrorServer(res, 500, "Error interno al obtener turnos.");
  }
};

// Controlador para obtener todos los turnos
export const getAllShifts = async (req, res) => {
  try {
    const [shifts, error] = await getAllShiftsService();

    if (error) return res.status(500).json({ message: error });

    return handleSuccess(res, 200, "Lista de turnos obtenida", shifts);
  } catch (error) {
    console.error("Error al obtener los turnos:", error.message);
    return handleErrorServer(res, 500, "Error interno al obtener los turnos.");
  }
};
