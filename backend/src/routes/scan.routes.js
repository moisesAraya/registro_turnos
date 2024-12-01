import express from "express";
import ScanController from "../controllers/scan.controller.js";

const router = express.Router();

router.post("/", ScanController.registrarEscaneo);

export default router;
