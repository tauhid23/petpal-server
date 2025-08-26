import express from "express";
import { register, login } from "../controllers/authContoller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Example of protected route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Welcome!", user: req.user });
});

export default router;
