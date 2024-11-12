import express from "express";
import ScanController from "./controllers/ScanController.js";

const router = express.Router();

router.post("/api/scan", ScanController.registrarEscaneo);

export default router;
