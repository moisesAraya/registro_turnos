import express from "express";
import { getRecentActivities } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/activities", getRecentActivities);

export default router;
