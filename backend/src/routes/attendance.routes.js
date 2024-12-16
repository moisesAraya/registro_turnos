import express from "express";
import { registerAttendance } from "../controllers/attendance.controller.js";

const router = express.Router();

router.post("/register", registerAttendance);

export default router;
