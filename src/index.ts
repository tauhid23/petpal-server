import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import sequelize from "./config/db";
import petRoutes from "./routes/petRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/pets", petRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  console.log("✅ Postgres connected & tables synced");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});










// // src/app.ts
// import { Request, Response } from "express";
// import express from "express";
// import dotenv from "dotenv";
// import morgan from "morgan";
// import cors from "cors";
// import connectDB from "./config/db";

// // Import Routes
// import petRoutes from "./routes/petRoutes";

// dotenv.config();
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));

// // Default Routes
// app.get("/", (req: Request, res: Response) => {
//   res.send("API is running 🚀");
// });

// app.get("/health", (req, res) => {
//   res.json({ status: "ok", message: "PetPal API is running 🚀" });
// });

// // Register Routes
// app.use("/api/pets", petRoutes);  // 👈 এখানে pet routes use করলাম

// // Connect DB & Start server
// const PORT = process.env.PORT || 5000;
// connectDB().then(() => {
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// });
