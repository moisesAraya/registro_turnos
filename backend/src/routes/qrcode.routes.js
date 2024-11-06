import express from "express";
import { obtenerQRCode, generarQRCode } from "../controllers/qrcode.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";

const router = express.Router();

router.get("/", authenticateJwt, obtenerQRCode); // Ruta para obtener el QR
router.post("/generate", authenticateJwt, generarQRCode); // Ruta para generar el QR

export default router;
