import { AppDataSource } from "../config/configDb.js";
import Attendance from "../entity/Attendance.js";

export const registerEarlyExit = async (req, res) => {
  try {
    const { user_id, reason } = req.body;

    if (!user_id || !reason) {
      return res
        .status(400)
        .json({ message: "El motivo es obligatorio para registrar salida temprana." });
    }

    const attendanceRepository = AppDataSource.getRepository(Attendance);

    // Buscar si existe una asistencia activa
    const attendance = await attendanceRepository.findOne({
      where: { userId: user_id, endTimestamp: null },
    });

    if (!attendance) {
      return res
        .status(404)
        .json({ message: "No hay registro de asistencia activo para este usuario." });
    }

    // Actualizar la hora de salida y motivo
    attendance.endTimestamp = new Date();
    attendance.reason = reason;

    await attendanceRepository.save(attendance);

    res.status(200).json({ message: "Salida temprana registrada exitosamente." });
  } catch (error) {
    console.error("Error al registrar salida temprana:", error.message);
    res.status(500).json({ message: "Error interno al registrar salida temprana." });
  }
};
