// src/services/shift.service.js
import { AppDataSource } from "../config/configDb.js";
import Shift from "../entity/shift.js";

// Servicio para iniciar un turno
export const startShiftService = async (user) => {
  try {
    const shiftRepository = AppDataSource.getRepository(Shift);
    const newShift = shiftRepository.create({
      startDate: new Date(),
      startTime: new Date().toTimeString().split(" ")[0], // Hora actual
      startedBy: user.id,
    });

    const shift = await shiftRepository.save(newShift);
    return [shift, null];
  } catch (error) {
    console.error("Error al iniciar turno:", error.message);
    return [null, "Error al iniciar turno"];
  }
};

// Servicio para terminar un turno
export const endShiftService = async (user) => {
  try {
    const shiftRepository = AppDataSource.getRepository(Shift);

    // Buscar el turno activo del usuario (sin hora de finalización)
    const activeShift = await shiftRepository.findOne({
      where: {
        startedBy: user.id,
        endTime: null,
        endDate: null,
      },
    });

    if (!activeShift) {
      return [null, "No hay un turno activo para terminar"];
    }

    // Actualizar el turno con la hora de finalización
    activeShift.endTime = new Date().toTimeString().split(" ")[0];
    activeShift.endDate = new Date();

    const updatedShift = await shiftRepository.save(activeShift);
    return [updatedShift, null];
  } catch (error) {
    console.error("Error al terminar turno:", error.message);
    return [null, "Error al terminar turno"];
  }
};

// Servicio para obtener el turno activo del usuario
export const getActiveShiftForUser = async (user) => {
  try {
    const shiftRepository = AppDataSource.getRepository(Shift);

    const activeShift = await shiftRepository.findOne({
      where: {
        startedBy: user.id,
        endTime: null,
        endDate: null,
      },
    });

    if (!activeShift) {
      return [null, "No tienes un turno activo."];
    }

    return [activeShift, null];
  } catch (error) {
    console.error("Error al obtener el turno activo:", error.message);
    return [null, "Error al obtener el turno activo"];
  }
};
