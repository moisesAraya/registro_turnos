import { Router } from "express";
import {
    getChartDays,
    getChartHours,
    getChartDetails
} from "../controllers/charts.controller.js";

const router = Router();

router.get("/days", getChartDays);
router.get("/hours", getChartHours);
router.get("/details", getChartDetails);

export default router;
