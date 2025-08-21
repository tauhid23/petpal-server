import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import User from "./User";

class Sitter extends Model {}

Sitter.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    availability: { type: DataTypes.STRING, allowNull: false },
    requests: { type: DataTypes.JSONB, defaultValue: [] }, // array of { userId, status }
  },
  { sequelize, modelName: "Sitter", tableName: "sitters", timestamps: true }
);

// Associations
User.hasOne(Sitter, { foreignKey: "userId" });
Sitter.belongsTo(User, { foreignKey: "userId" });

export default Sitter;






// import mongoose from "mongoose";

// const requestSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
// });

// const sitterSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   availability: { type: String, required: true },
//   requests: [requestSchema],
// }, { timestamps: true });

// export default mongoose.model("Sitter", sitterSchema);
