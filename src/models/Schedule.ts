// models/Schedule.ts
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import Pet from "./Pet";

class Schedule extends Model {
  public id!: string;
  public petId!: string;
  public type!: "vet" | "walk" | "meds" | "Feed" | string;
  public date!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Schedule.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    petId: { 
      type: DataTypes.UUID, 
      allowNull: false,
      references: { model: "pets", key: "id" },
      onDelete: "CASCADE",
    },
    type: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
  },
  { sequelize, modelName: "Schedule", tableName: "schedules", timestamps: true }
);

export default Schedule;
