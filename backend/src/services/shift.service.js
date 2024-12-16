import { AppDataSource } from "../config/configDb.js";
import Shift from "../entity/Shift.js";

// Iniciar turno
export async function startShiftService(user) {
  try {
    const shiftRepository = AppDataSource.getRepository(Shift);

    const newShift = shiftRepository.create({
      startDate: new Date().toISOString().split("T")[0],
      startTime: new Date().toLocaleTimeString(),
      startedBy: user.id,
    });

    await shiftRepository.save(newShift);

    return [newShift, null];
  } catch (error) {
    console.error("Error al iniciar turno:", error.message);
    return [null, "Error interno al iniciar turno."];
  }
}

// Terminar turno
export async function endShiftService(user) {
  try {
    const shiftRepository = AppDataSource.getRepository(Shift);

    // Buscar el turno activo más reciente
    const activeShift = await shiftRepository.findOne({
      where: { endedBy: null },
      order: { id: "DESC" },
    });

    if (!activeShift) {
      return [null, "No hay ningún turno activo para terminar."];
    }

    activeShift.endDate = new Date().toISOString().split("T")[0];
    activeShift.endTime = new Date().toLocaleTimeString();
    activeShift.endedBy = user.id;

    await shiftRepository.save(activeShift);

    return [activeShift, null];
  } catch (error) {
    console.error("Error al terminar turno:", error.message);
    return [null, "Error interno al terminar turno."];
  }
}
