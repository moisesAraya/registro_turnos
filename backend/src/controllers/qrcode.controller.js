// src/controllers/QRCodeController.js
import { AppDataSource } from "../config/configDb.js";
import QRCode from "../entity/QRCode.js";
import QRCodeLib from "qrcode";

// Controlador para obtener el código QR
export const obtenerQRCode = async (req, res) => {
  try {
    const qrCodeRepository = AppDataSource.getRepository(QRCode);
    const qrCode = await qrCodeRepository.findOne({ order: { createdAt: 'DESC' } });

    if (!qrCode) {
      return res.status(404).json({ message: 'No hay código QR disponible' });
    }

    return res.json({ codeData: qrCode.codeData });
  } catch (error) {
    console.error('Error al obtener el código QR:', error);
    return res.status(500).json({ message: 'Error al obtener el código QR', error: error.message });
  }
};


// Controlador para generar un nuevo código QR
export const generarQRCode = async (req, res) => {
  try {
    // Genera un código aleatorio
    const codeContent = Math.random().toString(36).substring(2, 15); // Código aleatorio

    // Genera el código QR a partir del contenido aleatorio
    const codeData = await QRCodeLib.toDataURL(codeContent);

    const qrCodeRepository = AppDataSource.getRepository(QRCode);
    const newQRCode = qrCodeRepository.create({
      codeData,
      codeContent, // Almacena el contenido para futuras referencias
      createdAt: new Date(),
      expiresAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // Expira en 24 horas
    });
    await qrCodeRepository.save(newQRCode);

    return res.status(201).json({ codeData: newQRCode.codeData });
  } catch (error) {
    console.error("Error al generar el código QR:", error);
    return res.status(500).json({ message: "Error al generar el código QR", error: error.message });
  }
};




export default {
  obtenerQRCode,
  generarQRCode,
};
