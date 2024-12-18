import express from "express";
import { registerAttendance, registerEarlyExit } from "../controllers/attendance.controller.js";

const router = express.Router();

router.post("/register", registerAttendance);
router.post("/early_exit", registerEarlyExit);

export default router;
