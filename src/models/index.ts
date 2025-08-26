import Pet from "./Pet";
import Schedule from "./Schedule";
import User from "./User";

// Pet and Schedule Associations
Pet.hasMany(Schedule, { foreignKey: "petId", as: "schedules" });
Schedule.belongsTo(Pet, { foreignKey: "petId" });

// User and Pet Associations
User.hasMany(Pet, { foreignKey: "ownerId", as: "pets" });
Pet.belongsTo(User, { foreignKey: "ownerId", as: "owner" });



export { Pet, Schedule, User};