import { AppDataSource } from "../config/configDb.js";
import Attendance from "../entity/Attendance.js";

export const registerAttendance = async (req, res) => {
  const { user_id, shift_id } = req.body;

  if (!user_id || !shift_id) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  try {
    const attendanceRepository = AppDataSource.getRepository(Attendance);

    const newAttendance = attendanceRepository.create({
      userId: user_id,
      shiftId: shift_id,
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

export const registerEarlyExit = async (req, res) => {
  const { user_id, shift_id, exit_reason, authorized_by } = req.body;

  if (!user_id || !shift_id || !exit_reason || !authorized_by) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  try {
    const attendanceRepository = AppDataSource.getRepository(Attendance);

    const attendance = await attendanceRepository.findOne({
      where: { userId: user_id, shiftId: shift_id },
    });

    if (!attendance) {
      return res.status(404).json({ message: "No se encontró la asistencia para este turno." });
    }

    attendance.endTimestamp = new Date();
    attendance.exitReason = exit_reason;
    attendance.authorizedBy = authorized_by;

    await attendanceRepository.save(attendance);

    res.status(200).json({
      success: true,
      message: "Salida temprana registrada exitosamente.",
    });
  } catch (error) {
    console.error("Error al registrar salida temprana:", error.message);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};
