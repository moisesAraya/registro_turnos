import express from "express";
import { getAllAreas } from "../controllers/areas.controller.js";

const router = express.Router();

router.get("/", getAllAreas);

export default router;
