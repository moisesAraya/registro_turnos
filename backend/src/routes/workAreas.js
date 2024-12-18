import express from "express";
import {
  handleGetAllWorkAreas,
  handleGetWorkAreasByWorkerId,
  handleCreateWorkArea,
  handleUpdateWorkArea,
  handleDeleteWorkArea,
} from "../controllers/workArea.controller.js";

const router = express.Router();

router.get("/", handleGetAllWorkAreas); 
router.get("/:worker_id", handleGetWorkAreasByWorkerId); 
router.post("/", handleCreateWorkArea); 
router.put("/:id", handleUpdateWorkArea); 
router.delete("/:id", handleDeleteWorkArea); 

export default router;