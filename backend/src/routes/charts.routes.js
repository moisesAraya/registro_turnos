"use strict";
import { Router } from "express";
import { getCharts, getChartsDetail } from "../controllers/charts.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";


const router = Router();

router
    .use(authenticateJwt);

router.get("/", getCharts); // Ruta para obtener el gráfico
router.get("/detail", getChartsDetail);

export default router;