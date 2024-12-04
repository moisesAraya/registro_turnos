"use strict";
import { Router } from "express";
import { getCharts, getChartsDetail } from "../controllers/charts.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdminOrUser } from "../middlewares/authorization.middleware.js";

const router = Router();

router
    .use(authenticateJwt)
    .use(isAdminOrUser);

router.get("/", getCharts); // Ruta para obtener el gráfico
router.get("/detail", getChartsDetail);

export default router;