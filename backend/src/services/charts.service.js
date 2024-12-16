"use strict";
import { AppDataSource } from "../config/configDb.js";
import Attendance from "../entity/Attendance.js";

export async function getAttendanceDaysService(query) {
    try {
        const { email, year, area } = query;
        const areaId = parseInt(area, 10);

        const attendanceRepository = AppDataSource.getRepository(Attendance);

        const queryBuilder = attendanceRepository
            .createQueryBuilder("attendance")
            .select("DATE_TRUNC('month', attendance.timestamp) as month")
            .addSelect("COUNT(*)", "count")
            .where("attendance.email = :email", { email })
            .andWhere("DATE_PART('year', attendance.timestamp) = :year", { year });

        if (areaId) {
            queryBuilder.andWhere("attendance.area = :area", { area: areaId });
        }

        const attendanceByMonth = await queryBuilder
            .groupBy("month")
            .orderBy("month", "ASC")
            .getRawMany();

        const monthData = Array(12).fill(0);

        attendanceByMonth.forEach((attendance) => {
            const monthIndex = new Date(attendance.month).getUTCMonth();
            monthData[monthIndex] = parseInt(attendance.count, 10);
        });

        const BarChartData = {
            labels: [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
            ],
            datasets: [
                {
                    label: `Días trabajados en ${year}`,
                    data: monthData,
                },
            ],
        };

        return [BarChartData, null];
    } catch (error) {
        console.error("Error al obtener los datos de asistencia:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getAttendanceHoursService(query) {
    try {
        const { email, year, area } = query;
        const areaId = parseInt(area, 10);

        const attendanceRepository = AppDataSource.getRepository(Attendance);

        const queryBuilder = attendanceRepository
            .createQueryBuilder("attendance")
            .select("DATE_TRUNC('month', attendance.timestamp) as month")
            .addSelect("SUM(attendance.hours)", "totalHours")
            .where("attendance.email = :email", { email })
            .andWhere("DATE_PART('year', attendance.timestamp) = :year", { year });

        if (areaId) {
            queryBuilder.andWhere("attendance.area = :area", { area: areaId });
        }

        const attendanceHoursByMonth = await queryBuilder
            .groupBy("month")
            .orderBy("month", "ASC")
            .getRawMany();

        const hourData = Array(12).fill(0);

        attendanceHoursByMonth.forEach((attendance) => {
            const monthIndex = new Date(attendance.month).getUTCMonth();
            hourData[monthIndex] = parseFloat(attendance.totalHours);
        });

        const LineChartData = {
            labels: [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
            ],
            datasets: [
                {
                    label: "Horas trabajadas",
                    data: hourData,
                },
            ],
        };

        return [LineChartData, null];
    } catch (error) {
        console.error("Error al obtener las horas trabajadas:", error);
        return [null, "Error interno del servidor"];
    }
}
