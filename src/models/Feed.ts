import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import User from "./User";

class Feed extends Model {}

Feed.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    caption: { type: DataTypes.STRING },
    photos: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
    flags: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  { sequelize, modelName: "Feed", tableName: "feeds", timestamps: true }
);

// Associations
User.hasMany(Feed, { foreignKey: "userId" });
Feed.belongsTo(User, { foreignKey: "userId" });

export default Feed;



// import mongoose from "mongoose";

// const feedSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   caption: String,
//   photos: [String],
//   flags: { type: Number, default: 0 },
// }, { timestamps: true });

// export default mongoose.model("Feed", feedSchema);
