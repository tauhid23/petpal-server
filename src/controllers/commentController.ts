import { Request, Response } from "express";
import Comment from "../models/Comment";
import Pet from "../models/Pet";

// Create a new comment
export const createComment = async (req: Request, res: Response) => {
  try {
    const { petId, userId, commentText } = req.body;

    const comment = await Comment.create({ petId, userId, commentText });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error creating comment", error });
  }
};

// Get all comments for a pet
export const getCommentsByPet = async (req: Request, res: Response) => {
  try {
    const { petId } = req.params;
    const comments = await Comment.findAll({ where: { petId }, order: [["createdAt", "DESC"]] });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
};

// Like a comment
export const likeComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const { userId } = req.body;

    const comment = await Comment.findByPk(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // যদি already liked না করে থাকে
    if (!comment.likedBy.includes(userId)) {
      comment.likedBy = [...comment.likedBy, userId];
      comment.likesCount = comment.likesCount + 1;
      await comment.save();
    }

    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error liking comment", error });
  }
};
