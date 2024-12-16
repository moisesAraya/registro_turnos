import { AppDataSource } from "../config/configDb.js";
import Attendance from "../entity/Attendance.js";

export const registerAttendance = async (req, res) => {
  const { latitude, longitude, userId } = req.body;

  if (!latitude || !longitude || !userId) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  try {
    const attendanceRepository = AppDataSource.getRepository(Attendance);

    const newAttendance = attendanceRepository.create({
      latitude,
      longitude,
      userId,
    });

    await attendanceRepository.save(newAttendance);

    res.status(201).json({ message: "Asistencia registrada exitosamente." });
  } catch (error) {
    console.error("Error al registrar asistencia:", error.message);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};
