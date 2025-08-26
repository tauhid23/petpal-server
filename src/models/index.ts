import Pet from "./Pet";
import Schedule from "./Schedule";
import User from "./User";
import Comment from "./Comment";

// Pet and Schedule Associations
Pet.hasMany(Schedule, { foreignKey: "petId", as: "schedules" });
Schedule.belongsTo(Pet, { foreignKey: "petId" });

// User and Pet Associations
User.hasMany(Pet, { foreignKey: "ownerId", as: "pets" });
Pet.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

// One Pet → Many Comments
Pet.hasMany(Comment, { foreignKey: "petId", as: "comments" });
Comment.belongsTo(Pet, { foreignKey: "petId", as: "pet" });

// One User → Many Comments
User.hasMany(Comment, { foreignKey: "userId", as: "comments" });
Comment.belongsTo(User, { foreignKey: "userId", as: "author" });



export { Pet, Schedule, User, Comment};