import express from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/events.controller.js";

const router = express.Router();

router.post("/create", authenticateJwt, createEvent);
router.put("/:id", authenticateJwt, updateEvent);
router.delete("/:id", authenticateJwt, deleteEvent);
router.get("/", getEvents);

export default router;
