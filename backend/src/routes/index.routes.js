"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js"; 
import attendanceRoutes from "./attendance.routes.js"; 
import eventRoutes from "./event.routes.js"; 
import chartsRoutes from "./charts.routes.js"; 
import workAreasRouter from "./workAreas.js";

const router = Router();

router
  .use("/auth", authRoutes) 
  .use("/users", userRoutes) 
  .use("/attendance", attendanceRoutes) 
  .use("/events", eventRoutes) 
  .use("/charts", chartsRoutes) 
  .use("/work_areas", workAreasRouter); 

export default router;
