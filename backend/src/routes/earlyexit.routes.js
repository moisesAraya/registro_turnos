import express from "express";
import { registerEarlyExit } from "../controllers/earlyexit.controller.js";

const router = express.Router();

// Ruta para registrar salida temprana
router.post("/", registerEarlyExit);

export default router;
