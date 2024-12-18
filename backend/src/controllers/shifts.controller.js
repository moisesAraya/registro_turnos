import { endShiftService, startShiftService, getActiveShiftService } from "../services/shift.service.js";
import { handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";

// Iniciar turno
export const startShift = async (req, res) => {
  try {
    const user = req.user;

    if (user.rol !== "administrador") {
      return res.status(403).json({ message: "Solo los administradores pueden iniciar un turno." });
    }

    const [shift, error] = await startShiftService(user);
    if (error) return res.status(400).json({ message: error });

    return handleSuccess(res, 201, "Turno iniciado exitosamente", shift);
  } catch (error) {
    console.error("Error al iniciar turno:", error.message);
    return handleErrorServer(res, 500, "Error interno al iniciar el turno.");
  }
};

// Finalizar turno
export const endShift = async (req, res) => {
  try {
    const user = req.user;

    if (user.rol !== "administrador") {
      return res.status(403).json({ message: "Solo los administradores pueden finalizar un turno." });
    }

    const [shift, error] = await endShiftService(user);
    if (error) return res.status(400).json({ message: error });

    return handleSuccess(res, 200, "Turno finalizado exitosamente", shift);
  } catch (error) {
    console.error("Error al finalizar turno:", error.message);
    return handleErrorServer(res, 500, "Error interno al finalizar el turno.");
  }
};

// Obtener turno activo
export const getActiveShifts = async (req, res) => {
  try {
    const [shift, error] = await getActiveShiftService();

    if (error) return res.status(404).json({ message: error });

    return handleSuccess(res, 200, "Turno activo obtenido", { shift_id: shift.id });
  } catch (error) {
    console.error("Error al obtener turno activo:", error.message);
    return handleErrorServer(res, 500, "Error interno al obtener el turno activo.");
  }
};
