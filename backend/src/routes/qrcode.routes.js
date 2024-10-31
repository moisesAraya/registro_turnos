import express from "express";
import QRCodeController from "../controllers/QRCodeController.js"; // Asegúrate de que la importación esté correcta
import { authenticateJwt } from "../middlewares/authentication.middleware.js";

const router = express.Router();

router.get("/", authenticateJwt, QRCodeController.getQRCode); // Ruta para obtener el QR
router.post("/generate", authenticateJwt, QRCodeController.generateQRCode); // Ruta para generar el QR

export default router;
