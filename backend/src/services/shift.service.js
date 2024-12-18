import { AppDataSource } from "../config/configDb.js";
import Shift from "../entity/Shift.js";
import Attendance from "../entity/Attendance.js";

// Servicio para iniciar un turno
export const startShiftService = async (user) => {
  try {
    const shiftRepository = AppDataSource.getRepository(Shift);

    const activeShift = await shiftRepository.query(`
      SELECT * FROM shifts WHERE "endDate" IS NULL LIMIT 1
    `);

    if (activeShift.length > 0) {
      return [null, "Ya existe un turno activo."];
    }

    const newShift = shiftRepository.create({
      startDate: new Date(),
      startTime: new Date(),
      startedBy: user.id,
    });

    await shiftRepository.save(newShift);
    return [newShift, null];
  } catch (error) {
    console.error("Error al iniciar turno:", error.message);
    return [null, "Error interno al iniciar el turno."];
  }
};

// Servicio para finalizar un turno y actualizar asistencia
export const endShiftService = async (user) => {
  try {
    const shiftRepository = AppDataSource.getRepository(Shift);
    const attendanceRepository = AppDataSource.getRepository(Attendance);

    const activeShift = await shiftRepository.query(`
      SELECT * FROM shifts WHERE "endDate" IS NULL LIMIT 1
    `);

    if (activeShift.length === 0) {
      return [null, "No hay un turno activo para finalizar."];
    }

    // Actualizar el turno activo
    const updatedShift = await shiftRepository.query(
      `
      UPDATE shifts
      SET "endDate" = NOW(), "endTime" = NOW(), "endedBy" = $1
      WHERE id = $2
      RETURNING *;
    `,
      [user.id, activeShift[0].id]
    );

    // Actualizar endTimestamp para todos los registros de asistencia vinculados al turno
    await attendanceRepository.query(
      `
      UPDATE attendance
      SET "endTimestamp" = NOW()
      WHERE "shiftId" = $1 AND "endTimestamp" IS NULL;
    `,
      [activeShift[0].id]
    );

    console.log("Turno finalizado y asistencia actualizada correctamente:", updatedShift);
    return [updatedShift[0], null];
  } catch (error) {
    console.error("Error al finalizar turno y actualizar asistencia:", error.message);
    return [null, "Error interno al finalizar el turno."];
  }
};

// Servicio para obtener turno activo
export const getActiveShiftService = async () => {
  try {
    const shiftRepository = AppDataSource.getRepository(Shift);

    const activeShift = await shiftRepository.query(`
      SELECT * FROM shifts WHERE "endDate" IS NULL LIMIT 1
    `);

    if (activeShift.length === 0) {
      return [null, "No hay un turno activo."];
    }

    return [activeShift[0], null];
  } catch (error) {
    console.error("Error al obtener turno activo:", error.message);
    return [null, "Error interno al obtener el turno activo."];
  }
};
