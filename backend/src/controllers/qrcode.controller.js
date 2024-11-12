import { AppDataSource } from "../config/configDb.js";
import { QRCode } from "../entity/QRCode.js";
import QRCodeLib from "qrcode";

export const obtenerQRCode = async (req, res) => {
  try {
    const qrCodeRepository = AppDataSource.getRepository(QRCode);
    const [qrCode] = await qrCodeRepository.find({
      order: { createdAt: 'DESC' },
      take: 1,
    });

    if (!qrCode) {
      return res.status(404).json({ message: 'No hay código QR disponible' });
    }

    return res.json({ codeData: qrCode.codeData });
  } catch (error) {
    console.error('Error al obtener el código QR:', error);
    return res.status(500).json({ message: 'Error al obtener el código QR', error: error.message });
  }
};



export const generarQRCode = async (req, res) => {
  try {
    const codeContent = Math.random().toString(36).substring(2, 15); 

    const codeData = await QRCodeLib.toDataURL(codeContent);

    const qrCodeRepository = AppDataSource.getRepository(QRCode);
    const newQRCode = qrCodeRepository.create({
      codeData,
      codeContent, 
      createdAt: new Date(),
      expiresAt: new Date(new Date().getTime() + 15 * 60 * 1000), 
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
