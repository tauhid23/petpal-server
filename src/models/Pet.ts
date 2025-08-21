import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import User from "./User";

class Pet extends Model {}

Pet.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    ownerId: { type: DataTypes.UUID, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: false },
    species: { type: DataTypes.STRING },
    breed: { type: DataTypes.STRING },
    dob: { type: DataTypes.DATE },
    photos: { type: DataTypes.ARRAY(DataTypes.STRING) },
    microchipId: { type: DataTypes.STRING },
    schedule: { type: DataTypes.JSONB, defaultValue: [] },
    emergencyContact: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "Pet", tableName: "pets", timestamps: true }
);

// Associations
User.hasMany(Pet, { foreignKey: "ownerId" });
Pet.belongsTo(User, { foreignKey: "ownerId" });

export default Pet;




// import mongoose from "mongoose";

// const scheduleSchema = new mongoose.Schema({
//   type: { type: String, enum: ["walk", "med", "grooming", "vet"], required: true },
//   date: { type: Date, required: true },
// });

// const petSchema = new mongoose.Schema({
//   ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   name: { type: String, required: true },
//   species: String,
//   breed: String,
//   dob: Date,
//   photos: [String],
//   microchipId: String,
//   schedule: [scheduleSchema],
//   emergencyContact: String,
// }, { timestamps: true });

// export default mongoose.model("Pet", petSchema);


