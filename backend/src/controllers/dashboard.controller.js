import { AppDataSource } from "../config/configDb.js";
import Attendance from "../entity/Attendance.js";
import Shift from "../entity/Shift.js";

export const getRecentActivities = async (req, res) => {
  try {
    const attendanceRepository = AppDataSource.getRepository(Attendance);
    const shiftRepository = AppDataSource.getRepository(Shift);

    const recentAttendances = await attendanceRepository
      .createQueryBuilder("attendance")
      .leftJoinAndSelect("attendance.user", "user")
      .orderBy("attendance.timestamp", "DESC")
      .limit(5)
      .getMany();

    const recentShifts = await shiftRepository
      .createQueryBuilder("shift")
      .leftJoinAndSelect("shift.startedBy", "admin")
      .where("shift.endDate IS NOT NULL")
      .orderBy("shift.endDate", "DESC")
      .limit(5)
      .getMany();

    const activities = [
      ...recentAttendances.map((a) => ({
        type: "attendance",
        user: a.user.nombreCompleto,
        timestamp: a.timestamp,
        details: "Ingreso al turno",
      })),
      ...recentShifts.map((s) => ({
        type: "shift",
        admin: s.startedBy?.nombreCompleto || "Desconocido",
        timestamp: s.endDate,
        details: "Turno cerrado",
      })),
    ];

    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.status(200).json(activities);
  } catch (error) {
    console.error("Error al obtener actividades recientes:", error.message);
    res.status(500).json({ message: "Error al obtener actividades recientes." });
  }
};
