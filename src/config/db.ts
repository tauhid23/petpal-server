// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI || "");
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error("MongoDB connection failed", error);
//     process.exit(1);
//   }
// };

// export default connectDB;
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.POSTGRES_DB || "petpal",
  process.env.POSTGRES_USER || "postgres",
  process.env.POSTGRES_PASSWORD || "password",
  {
    host: process.env.POSTGRES_HOST || "localhost",
    dialect: "postgres",
    logging: console.log,
  }
);

export default sequelize;
