import { Request, Response } from "express";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import User from "../models/User";
import bcrypt from "bcrypt";

// ------------------
// Request body types
// ------------------
interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

// ------------------
// Register Controller
// ------------------
export const register = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response
) => {
  try {
    const { name, email, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// ------------------
// Login Controller
// ------------------
export const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // compare password
    const userJson = user.toJSON() as {
      id: string;
      name: string;
      email: string;
      password: string;
    };
    const isMatch = await bcrypt.compare(password, userJson.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // create jwt token
    const payload = {
      id: userJson.id,
      name: userJson.name,
      email: userJson.email,
    };

    const secret: Secret = process.env.JWT_SECRET as string;

    const expiresIn: SignOptions["expiresIn"] =
      (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "1h";

    const token = jwt.sign(payload, secret, { expiresIn });
    const userdata = {name:userJson.name, id:userJson.id}
    res.json({ message: "Login successful", token:token, user:userdata });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
