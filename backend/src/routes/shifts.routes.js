import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { startShift, endShift } from "../controllers/shifts.controller.js";

const router = Router();

router.post("/start", authenticateJwt, startShift);
router.post("/end", authenticateJwt, endShift);

export default router;
