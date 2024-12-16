import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import attendanceRoutes from "./attendance.routes.js"; 


const router = Router();

router
  .use("/auth", authRoutes)
  .use("/user", userRoutes)
  .use("/attendance", attendanceRoutes);
  

export default router;
