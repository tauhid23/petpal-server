import express from "express";
import { createComment, getCommentsByPet, likeComment } from "../controllers/commentController";

const router = express.Router();

// POST /api/comments
router.post("/comment", createComment);

// GET /api/comments/:petId
router.get("/:petId", getCommentsByPet);

// POST /api/comments/like/:commentId 
router.post("/like/:commentId", likeComment);

export default router;
