// src/routes/shifts.routes.js
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { startShift, endShift, getActiveShifts } from "../controllers/shifts.controller.js";

const router = Router();

router.use(authenticateJwt);

router.post("/start", startShift);
router.post("/end", endShift);
router.get("/active", getActiveShifts);

export default router;
