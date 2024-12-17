import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { endShift, startShift } from "../controllers/shifts.controller.js";

const router = Router();

router
    .use(authenticateJwt);

router.post("/start", authenticateJwt, startShift);
router.post("/end", authenticateJwt, endShift);

export default router;
