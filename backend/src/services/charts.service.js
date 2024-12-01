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

        const scanDetail = await scanRepository.find({
            select: ["id", "email", "scanTime"],
            order: {
            scanTime: "ASC"
            },
            where: { email: email },
        });

        return [scanDetail, null];
    } catch (error) {
        console.error("Error al obtener los datos del escaneo:", error);
        return [null, "Error interno del servidor"];
    }
}
