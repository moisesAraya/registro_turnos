import { Router } from "express";
import { getChartDaysMonthYear } from "../controllers/charts.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdminOrUser } from "../middlewares/authorization.middleware.js";

const router = Router();

router
    .use(authenticateJwt)
    .use(isAdminOrUser);

router.get("/days-month-year", getChartDaysMonthYear);
// router.get("/hours", getChartHours);
// router.get("/details", getChartDetails);

export default router;
