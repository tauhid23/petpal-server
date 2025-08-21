// src/routes/petRoutes.ts
import { Router } from "express";
import {
  getAllPets,
  getPetById,
  getPetsByOwnerId,
  createPet,
  updatePet,
  deletePet,
} from "../controllers/petController";

const router = Router();

// GET
router.get("/", getAllPets);                  // Get all pets
router.get("/:id", getPetById);               // Get pet by ID
router.get("/owner/:ownerId", getPetsByOwnerId); // Get pets by ownerId

// POST
router.post("/", createPet);                 // Create pet

// PUT
router.put("/:id", updatePet);                // Update pet

// DELETE
router.delete("/:id", deletePet);             // Delete pet

export default router;
