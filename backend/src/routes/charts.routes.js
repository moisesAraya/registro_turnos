import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdminOrUser } from "../middlewares/authorization.middleware.js";
import { 
    getChartDaysYear,
    getChartExtraHoursMonth,
    getChartExtraHoursYear,
    getChartHoursMonth,
    getChartHoursYear,
    getChartMonth,
} from "../controllers/charts.controller.js";

const router = Router();

router
    .use(authenticateJwt)
    .use(isAdminOrUser);

router.get("/days-year", getChartDaysYear);
router.get("/hours-year", getChartHoursYear);
router.get("/extra-hours-year", getChartExtraHoursYear);
router.get("/months", getChartMonth);
router.get("/hours-month", getChartHoursMonth);
router.get("/extra-hours-month", getChartExtraHoursMonth);

export default router;
