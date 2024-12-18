"use strict";
import { AppDataSource } from "../config/configDb.js";
import Attendance from "../entity/Attendance.js";
import Area from "../entity/area.js";

export async function getAreasService() {
    try {
        const areasRepository = AppDataSource.getRepository(Area)
        
        const areas = await areasRepository.find();

        if (!areas || areas.length === 0) return [null, "No hay áreas"];

        return [areas, null];
    } catch (error) {
        console.error("Error al obtener las áreas:", error);
        return [null, "Error interno del servidor"];
        
    }
};

export async function getDaysYearService(query){
    try {
        const { email, year, area } = query;
        const areaId = parseInt(area, 10);
        
        const queryBuilder = AppDataSource.getRepository(Attendance)
            .createQueryBuilder("attendance")
            .innerJoin("attendance.user", "user")
            .innerJoin("user.workAreas", "workArea")
            .select("DATE_TRUNC('month', attendance.timestamp)", "month")
            .addSelect("COUNT(*)", "count")
            .where("user.email = :email", { email })
            .andWhere("DATE_PART('year', attendance.timestamp) = :year", { year })
            .andWhere("DATE(attendance.timestamp) = workArea.shift_date");

        if (areaId !== 0) {
            queryBuilder.andWhere("workArea.work_area_id = :area", { area });
        }

        const Data = await queryBuilder
            .groupBy("month")
            .orderBy("month", "ASC")
            .getRawMany();

        const monthData = Array(12).fill(0);

        Data.forEach((date) => {
            const monthIndex = new Date(date.month).getUTCMonth();
            monthData[monthIndex] = parseInt(date.count, 10);
        });

        const chartData = {
            labels: [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
                "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
            ],
            datasets: [
                {
                    label: "Días trabajados",
                    data: monthData,
                },
            ],
        };

        return [chartData, null];
        
    } catch (error) {
        console.error("Error al obtener los datos de asistencia:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getHoursYearService(query){
    try {
        const { email, year, area } = query;
        const areaId = parseInt(area, 10);

        const queryBuilder = AppDataSource.getRepository(Attendance)
            .createQueryBuilder("attendance")
            .innerJoin("attendance.user", "user")
            .innerJoin("user.workAreas", "workArea")
            .select("DATE_TRUNC('month', attendance.timestamp)", "month")
            .addSelect("SUM(EXTRACT(EPOCH FROM(attendance.endTimestamp - attendance.timestamp)) / 3600)", "totalHours")
            .where("user.email = :email", { email })
            .andWhere("DATE_PART('year', attendance.timestamp) = :year", { year })
            .andWhere("attendance.endTimestamp IS NOT NULL")
            .andWhere("DATE(attendance.timestamp) = workArea.shift_date")
            .andWhere("attendance.endTimestamp > attendance.timestamp");

        if (areaId !== 0) {
            queryBuilder.andWhere("workArea.work_area_id = :area", { area });
        }

        const Data = await queryBuilder
            .groupBy("month")
            .orderBy("month", "ASC")
            .getRawMany();

        const hourData = Array(12).fill(0);

        Data.forEach((date) => {
            const monthIndex = new Date(date.month).getUTCMonth();
            hourData[monthIndex] = parseFloat(parseFloat(date.totalHours).toFixed(3));
        });

        const chartData = {
            labels: [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
                "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
            ],
            datasets: [
                {
                    label: "Horas trabajadas",
                    data: hourData,
                },
            ],
        };

        return [chartData, null];
    } catch (error) {
        console.error("Error al obtener las horas trabajadas:", error);
        return [null, "Error interno del servidor"];
        
    }
}

export async function getExtraHoursYearService(query) {
    try {
        const { email, year, area } = query;
        const areaId = parseInt(area, 10);

        const queryBuilder = AppDataSource.getRepository(Attendance)
            .createQueryBuilder("attendance")
            .innerJoin("attendance.user", "user")
            .innerJoin("attendance.shift", "shift")
            .innerJoin("user.workAreas", "workArea")
            .select("DATE_TRUNC('month', attendance.timestamp)", "month")
            .addSelect(`
                COALESCE(
                    SUM(
                        EXTRACT(
                            EPOCH FROM (
                                "attendance"."endTimestamp" - (DATE("attendance"."timestamp") + "shift"."endTime"::interval)
                            )
                        ) / 3600
                    ), 0
                ) AS "extraHours"
            `)
            .where("user.email = :email", { email })
            .andWhere("DATE_PART('year', attendance.timestamp) = :year", { year })
            .andWhere(`"attendance"."endTimestamp" IS NOT NULL`)
            .andWhere(`"shift"."endTime" IS NOT NULL`)
            .andWhere(`"attendance"."endTimestamp" > (DATE("attendance"."timestamp") + "shift"."endTime"::interval)`)
            .andWhere("DATE(attendance.timestamp) = workArea.shift_date");

        if (areaId !== 0) {
            queryBuilder.andWhere("workArea.work_area_id = :area", { area: areaId });
        }

        const Data = await queryBuilder
            .groupBy("DATE_TRUNC('month', attendance.timestamp)")
            .orderBy("month", "ASC")
            .getRawMany();

        const extraHoursData = Array(12).fill(0);

        Data.forEach((date) => {
            const monthIndex = new Date(date.month).getUTCMonth();
            extraHoursData[monthIndex] = parseFloat(parseFloat(date.extraHours).toFixed(2))  || 0;
        });

        const chartData = {
            labels: [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
                "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
            ],
            datasets: [
                {
                    label: "Horas extra trabajadas",
                    data: extraHoursData,
                },
            ],
        };

        return [chartData, null];
    } catch (error) {
        console.error("Error al obtener las horas extra trabajadas:", error);
        return [null, "Error interno del servidor"];
    }
};

export async function getMonthDataService(query){
    try {
        const { email, year, area, month } = query;
        const areaId = parseInt(area, 10);

        const queryBuilder = AppDataSource.getRepository(Attendance)
            .createQueryBuilder("attendance")
            .innerJoin("attendance.user", "user")
            .innerJoin("user.workAreas", "workArea")
            .select("DATE_PART('day', attendance.timestamp)", "day")
            .addSelect("COUNT(*)", "count")
            .where("user.email = :email", { email })
            .andWhere("DATE_PART('year', attendance.timestamp) = :year", { year })
            .andWhere("DATE_PART('month', attendance.timestamp) = :month", { month })
            .andWhere("DATE(attendance.timestamp) = workArea.shift_date");

        if (areaId !== 0) {
            queryBuilder.andWhere("workArea.work_area_id = :area", { area });
        }

        const Data = await queryBuilder
            .groupBy("day")
            .orderBy("day", "ASC")
            .getRawMany();

        const daysInMonth = new Date(year, month, 0).getDate();
        const dayData = Array(daysInMonth).fill(0);

        Data.forEach((date) => {
            const dayIndex = parseInt(date.day, 10) - 1;
            dayData[dayIndex] = 1;
        });

        const chartData = {
            labels: Array.from({ length: daysInMonth }, (_, i) => i + 1),
            datasets: [
                {
                    label: "Días trabajados",
                    data: dayData,
                },
            ],
        };

        return [chartData, null];
    } catch (error) {
        console.error("Error al obtener los datos de asistencia:", error);
        return [null, "Error interno del servidor"];
    }
};

export async function getHoursMonthService(query){
    try {
        const { email, year, area, month } = query;
        const areaId = parseInt(area, 10);

        const queryBuilder = AppDataSource.getRepository(Attendance)
            .createQueryBuilder("attendance")
            .innerJoin("attendance.user", "user")
            .innerJoin("user.workAreas", "workArea")
            .select("DATE_PART('day', attendance.timestamp)", "day")
            .addSelect("SUM(EXTRACT(EPOCH FROM(attendance.endTimestamp - attendance.timestamp)) / 3600)", "totalHours")
            .where("user.email = :email", { email })
            .andWhere("DATE_PART('year', attendance.timestamp) = :year", { year })
            .andWhere("DATE_PART('month', attendance.timestamp) = :month", { month })
            .andWhere("attendance.endTimestamp IS NOT NULL")
            .andWhere("DATE(attendance.timestamp) = workArea.shift_date")
            .andWhere("attendance.endTimestamp > attendance.timestamp");

        if (areaId !== 0) {
            queryBuilder.andWhere("workArea.work_area_id = :area", { area });
        };

        const Data = await queryBuilder
            .groupBy("day")
            .orderBy("day", "ASC")
            .getRawMany();

        const daysInMonth = new Date(year, month, 0).getDate();
        const hourData = Array(daysInMonth).fill(0);

        Data.forEach((date) => {
            const dayIndex = parseInt(date.day, 10) - 1;
            hourData[dayIndex] = parseFloat(parseFloat(date.totalHours).toFixed(2));
        });

        const chartData = {
            labels: Array.from({ length: daysInMonth }, (_, i) => i + 1),
            datasets: [
                {
                    label: "Horas trabajadas",
                    data: hourData,
                },
            ],
        };

        return [chartData, null];
    } catch (error) {
        console.error("Error al obtener las horas trabajadas:", error);
        return [null, "Error interno del servidor"];
        
    }
};

export async function getExtraHoursMonthService(query) {
    try {
        const { email, year, area, month } = query;
        const areaId = parseInt(area, 10);

        const queryBuilder = AppDataSource.getRepository(Attendance)
            .createQueryBuilder("attendance")
            .innerJoin("attendance.user", "user")
            .innerJoin("user.workAreas", "workArea")
            .innerJoin("attendance.shift", "shift")
            .select("DATE_PART('day', attendance.timestamp)", "day")
            .addSelect(`
                COALESCE(
                    SUM(
                        EXTRACT(
                            EPOCH FROM (
                                "attendance"."endTimestamp" - (DATE("attendance"."timestamp") + "shift"."endTime"::interval)
                            )
                        ) / 3600
                    ), 0
                ) AS "extraHours"
            `)
            .where("user.email = :email", { email })
            .andWhere("DATE_PART('year', attendance.timestamp) = :year", { year })
            .andWhere("DATE_PART('month', attendance.timestamp) = :month", { month })
            .andWhere(`"attendance"."endTimestamp" IS NOT NULL`)
            .andWhere(`"shift"."endTime" IS NOT NULL`)
            .andWhere(`"attendance"."endTimestamp" > (DATE("attendance"."timestamp") + "shift"."endTime"::interval)`)
            .andWhere("DATE(attendance.timestamp) = workArea.shift_date");

        if (areaId !== 0) {
            queryBuilder.andWhere("workArea.work_area_id = :area", { area: areaId });
        }

        const Data = await queryBuilder
            .groupBy("DATE_PART('day', attendance.timestamp)")
            .orderBy("day", "ASC")
            .getRawMany();

        const daysInMonth = new Date(year, month, 0).getDate();
        const extraHoursData = Array(daysInMonth).fill(0);

        Data.forEach((date) => {
            const dayIndex = parseInt(date.day, 10) - 1;
            extraHoursData[dayIndex] = parseFloat(parseFloat(date.extraHours).toFixed(2)) || 0;
        });

        const chartData = {
            labels: Array.from({ length: daysInMonth }, (_, i) => i + 1),
            datasets: [
                {
                    label: "Horas extra trabajadas",
                    data: extraHoursData,
                },
            ],
        };

        return [chartData, null];
    } catch (error) {
        console.error("Error al obtener las horas extra trabajadas:", error);
        return [null, "Error interno del servidor"];
    }
};