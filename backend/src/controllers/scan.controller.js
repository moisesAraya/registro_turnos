// src/controllers/ScanController.js
import { AppDataSource } from "../config/configDb.js";
import { Scan } from "../entity/Scan.js";

export const registrarEscaneo = async (req, res) => {
  const { qrContent, name, email, scanTime } = req.body;

  try {
    const scanRepository = AppDataSource.getRepository(Scan);
    const newScan = scanRepository.create({
      qrContent,
      name,
      email,
      scanTime,
    });
    await scanRepository.save(newScan);

    res.status(201).json({ message: "Escaneo registrado exitosamente" });
  } catch (error) {
    console.error("Error al registrar el escaneo:", error);
    res.status(500).json({ message: "Error al registrar el escaneo" });
  }
};

export default {
  registrarEscaneo,
};
