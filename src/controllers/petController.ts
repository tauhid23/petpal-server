// // src/controllers/petController.ts
// import { Request, Response } from "express";
// import Pet from "../models/Pet";

// // ✅ Get all pets
// export const getAllPets = async (req: Request, res: Response) => {
//   try {
//     const pets = await Pet.find();
//     res.json(pets);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch pets" });
//   }
// };

// // ✅ Get pet by ID
// export const getPetById = async (req: Request, res: Response) => {
//   try {
//     const pet = await Pet.findById(req.params.id);
//     if (!pet) return res.status(404).json({ message: "Pet not found" });
//     res.json(pet);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch pet" });
//   }
// };

// // ✅ Get pets by ownerId (userId)
// export const getPetsByOwnerId = async (req: Request, res: Response) => {
//   try {
//     const pets = await Pet.find({ ownerId: req.params.ownerId });
//     res.json(pets);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch pets for this owner" });
//   }
// };

// // ✅ Create new pet
// export const createPet = async (req: Request, res: Response) => {
//   try {
//     const pet = new Pet(req.body);
//     await pet.save();
//     res.status(201).json(pet);
//   } catch (error) {
//     console.log(error)
//     res.status(400).json({ message: "Failed to create pet" });
//   }
// };

// // ✅ Update pet
// export const updatePet = async (req: Request, res: Response) => {
//   try {
//     const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!pet) return res.status(404).json({ message: "Pet not found" });
//     res.json(pet);
//   } catch (error) {
//     res.status(400).json({ message: "Failed to update pet" });
//   }
// };

// // ✅ Delete pet
// export const deletePet = async (req: Request, res: Response) => {
//   try {
//     const pet = await Pet.findByIdAndDelete(req.params.id);
//     if (!pet) return res.status(404).json({ message: "Pet not found" });
//     res.json({ message: "Pet deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete pet" });
//   }
// };

import { Request, Response } from "express";
import Pet from "../models/Pet";

// Get all pets
export const getAllPets = async (req: Request, res: Response) => {
  try {
    const pets = await Pet.findAll();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pets", error });
  }
};

// Get pet by ID
export const getPetById = async (req: Request, res: Response) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pet", error });
  }
};

// Get pets by ownerId
export const getPetsByOwnerId = async (req: Request, res: Response) => {
  try {
    const pets = await Pet.findAll({ where: { ownerId: req.params.ownerId } });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pets", error });
  }
};

// Create new pet
export const createPet = async (req: Request, res: Response) => {
  try {
    const pet = await Pet.create(req.body);
    res.status(201).json(pet);
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "Failed to create pet", error });
  }
};

// Update pet
export const updatePet = async (req: Request, res: Response) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    await pet.update(req.body);
    res.json(pet);
  } catch (error) {
    res.status(400).json({ message: "Failed to update pet", error });
  }
};

// Delete pet
export const deletePet = async (req: Request, res: Response) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    await pet.destroy();
    res.json({ message: "Pet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete pet", error });
  }
};
