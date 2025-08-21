import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import Pet from "./Pet";

class Log extends Model {}

Log.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    petId: { type: DataTypes.UUID, allowNull: false },
    type: { type: DataTypes.ENUM("walk", "feed", "med", "weight"), allowNull: false },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    notes: { type: DataTypes.STRING },
    photo: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "Log", tableName: "logs", timestamps: true }
);

// Associations
Pet.hasMany(Log, { foreignKey: "petId" });
Log.belongsTo(Pet, { foreignKey: "petId" });

export default Log;





// import mongoose from "mongoose";

// const logSchema = new mongoose.Schema({
//   petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
//   type: { type: String, enum: ["walk", "feed", "med", "weight"], required: true },
//   date: { type: Date, default: Date.now },
//   notes: String,
//   photo: String,
// }, { timestamps: true });

// export default mongoose.model("Log", logSchema);
