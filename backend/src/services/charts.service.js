"use strict";
import { Scan } from "../entity/Scan.js";
import { AppDataSource } from "../config/configDb.js";

export async function getScanInfo(){
    try {
        const scanRepository = AppDataSource.getRepository(Scan);

        const scans = await scanRepository.find();
    
        if (!scans || scans.length === 0) return [null, "No hay usuarios"];
    
        const scanData = scans.map(scan => scan);
    
        return [scanData, null];
    } catch (error) {
        console.error("Error al obtener a los usuarios:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getScanDetailService(query){
    try {
        const { email } = query;

        const scanRepository = AppDataSource.getRepository(Scan);

        const scanDetailByMonth = await scanRepository
            .createQueryBuilder("scan")
            .select("DATE_TRUNC('month', scan.scanStartTime) as month")
            .addSelect("COUNT(*)", "count")
            .where("scan.email = :email", { email })
            .groupBy("month")
            .orderBy("month", "ASC")
            .getRawMany();

        const monthData = Array(12).fill(0);

        scanDetailByMonth.forEach((scan) => {
            const monthIndex = new Date(scan.month).getUTCMonth();
            monthData[monthIndex] = parseInt(scan.count, 10);
        });

        const BarChartData = {
            labels: [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre",
            ],
            datasets: [
                {
                    label: "Días trabajados",
                    data: monthData,
                },
            ],
        };

        return [BarChartData, null];
    } catch (error) {
        console.error("Error al obtener los datos del escaneo:", error);
        return [null, "Error interno del servidor"];
    }
}
