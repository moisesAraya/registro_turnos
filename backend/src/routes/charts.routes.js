import express from "express";
import { getChartsFormatted } from "../controllers/charts.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";

const router = express.Router();

// Ruta para datos de gráficos
router.get("/formatted", authenticateJwt, getChartsFormatted);

export default router;
