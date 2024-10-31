import { AppDataSource } from "../config/configDb.js";
import QRCode from "../entity/QRCode.js";
import { MoreThanOrEqual } from "typeorm";

const QRCodeController = {
  generateQRCode: async (req, res) => {
    try {
      if (req.user.role !== "administrador") {
        return res.status(403).json({ message: "No tienes permisos para generar un código QR" });
      }

      const codeData = `QR-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
      const qrCodeRepo = AppDataSource.getRepository(QRCode);
      const qrCode = qrCodeRepo.create({
        codeData,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        scheduledAt: new Date(),
      });

      await qrCodeRepo.save(qrCode);
      res.status(201).json({ codeData });
    } catch (err) {
      console.error("Error en generateQRCode:", err);
      res.status(500).json({ message: "Error al generar el código QR" });
    }
  },

  getQRCode: async (req, res) => {
    try {
      const qrCodeRepo = AppDataSource.getRepository(QRCode);
      const qrCode = await qrCodeRepo.findOne({
        where: { expiresAt: MoreThanOrEqual(new Date()) },
        order: { createdAt: "DESC" },
      });

      if (!qrCode) {
        return res.status(404).json({ message: "No hay código QR disponible" });
      }

      res.json({ codeData: qrCode.codeData });
    } catch (err) {
      console.error("Error en getQRCode:", err);
      res.status(500).json({ message: "Error al obtener el código QR" });
    }
  },
};

export default QRCodeController;
