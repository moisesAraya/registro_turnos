import express from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/events.controller.js";

const router = express.Router();

// Rutas para administradores (crear, actualizar, eliminar eventos)
router.post("/create", authenticateJwt, createEvent);
router.put("/:id", authenticateJwt, updateEvent);
router.delete("/:id", authenticateJwt, deleteEvent);

// Ruta para ver eventos (disponible para todos)
router.get("/", getEvents);

export default router;
