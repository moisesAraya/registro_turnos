"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js"; // Autenticación
import attendanceRoutes from "./attendance.routes.js"; // Asistencia
import eventRoutes from "./event.routes.js"; // Eventos
import chartsRoutes from "./charts.routes.js"; // Gráficos
import workAreasRouter from "./workAreas.js"; // Áreas de trabajo

const router = Router();

router
  .use("/auth", authRoutes) // Rutas de autenticación
  .use("/users", userRoutes) // Rutas de usuarios
  .use("/attendance", attendanceRoutes) // Rutas de asistencia
  .use("/events", eventRoutes) // Rutas de eventos
  .use("/charts", chartsRoutes) // Rutas de gráficos
  .use("/work_areas", workAreasRouter); // Rutas para áreas de trabajo

export default router;
