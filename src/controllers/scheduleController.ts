// controllers/scheduleController.ts
import { Request, Response } from "express";
import Schedule from "../models/Schedule";

// Get all schedules for a pet
export const getSchedulesByPet = async (req: Request, res: Response) => {
  try {
    const schedules = await Schedule.findAll({ where: { petId: req.params.petId } });
    res.json(schedules);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Failed to fetch schedules", error: err });
  }
};

// Add a new schedule for a pet
export const addSchedule = async (req: Request, res: Response) => {
  try {
    const { petId, type, date } = req.body;
    const schedule = await Schedule.create({ petId, type, date });
    res.status(201).json(schedule);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Failed to add schedule", error: err });
  }
};

// Update a schedule
export const updateSchedule = async (req: Request, res: Response) => {
  try {
    const schedule = await Schedule.findByPk(req.params.id);
    if (!schedule) return res.status(404).json({ message: "Schedule not found" });

    // Safe destructuring
    const { type, date } = req.body || {};

    if (!type || !date) {
      return res.status(400).json({ message: "Both 'type' and 'date' are required" });
    }

    await schedule.update({ type, date });
    res.json(schedule);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update schedule", error: err });
  }
};

// Delete a schedule
export const deleteSchedule = async (req: Request, res: Response) => {
  try {
    const schedule = await Schedule.findByPk(req.params.id);
    if (!schedule) return res.status(404).json({ message: "Schedule not found" });

    await schedule.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Failed to delete schedule", error: err });
  }
};
