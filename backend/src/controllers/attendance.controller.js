import { AppDataSource } from "../config/configDb.js";
import Attendance from "../entity/Attendance.js";

export const registerAttendance = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "El ID del usuario es obligatorio." });
  }

  try {
    const attendanceRepository = AppDataSource.getRepository(Attendance);

    const newAttendance = attendanceRepository.create({
      userId,
      registeredAt: new Date(),
    });

    await attendanceRepository.save(newAttendance);

    res.status(201).json({
      success: true,
      message: "Asistencia registrada exitosamente.",
    });
  } catch (error) {
    console.error("Error al registrar asistencia:", error.message);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};
