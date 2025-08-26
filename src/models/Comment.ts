import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface CommentAttributes {
  id: string;
  petId: string;
  userId: string;
  commentText: string;
  likesCount?: number;
  likedBy?: string[];
}

interface CommentCreationAttributes extends Optional<CommentAttributes, "id" | "likesCount" | "likedBy"> {}

class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
  public id!: string;
  public petId!: string;
  public userId!: string;
  public commentText!: string;
  public likesCount!: number;
  public likedBy!: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    petId: { type: DataTypes.UUID, allowNull: false },
    userId: { type: DataTypes.UUID, allowNull: false },
    commentText: { type: DataTypes.STRING, allowNull: false },
    likesCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    likedBy: { type: DataTypes.ARRAY(DataTypes.UUID), defaultValue: [] },
  },
  {
    sequelize,
    modelName: "Comment",
    tableName: "comments",
    timestamps: true,
  }
);

export default Comment;
