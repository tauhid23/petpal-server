import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import Schedule from "./Schedule";

interface PetAttributes {
  id: string;
  ownerId?: string | null;
  name: string;
  species?: string;
  breed?: string;
  dob?: Date;
  photos?: string[];
  microchipId?: string;
  emergencyContact?: string;
}

interface PetCreationAttributes extends Optional<PetAttributes, "id"> {}

class Pet extends Model<PetAttributes, PetCreationAttributes> implements PetAttributes {
  public id!: string;
  public ownerId!: string | null;
  public name!: string;
  public species!: string;
  public breed!: string;
  public dob!: Date;
  public photos!: string[];
  public microchipId!: string;
  public emergencyContact!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

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
    emergencyContact: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "Pet",
    tableName: "pets",
    timestamps: true,
  }
);


export default Pet;
