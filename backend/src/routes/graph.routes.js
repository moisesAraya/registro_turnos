import express from "express";
import { Router } from "express";
import { obtenerGraph } from "../controllers/graph.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";

const router = express.Router();

router.get("/graph", authenticateJwt, obtenerGraph); // Ruta para obtener el gráfico

export default router;