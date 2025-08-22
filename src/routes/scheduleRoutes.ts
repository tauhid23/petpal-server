// routes/scheduleRoutes.ts
import express from "express";
import {
  getSchedulesByPet,
  addSchedule,
  updateSchedule,
  deleteSchedule,
} from "../controllers/scheduleController";

const router = express.Router();

// GET schedules for a pet
router.get("/pet/:petId", getSchedulesByPet);

// POST add new schedule
router.post("/", addSchedule);

// PUT update schedule
router.put("/:id", updateSchedule);

// DELETE schedule
router.delete("/:id", deleteSchedule);

export default router;
