// models/index.ts
import Pet from "./Pet";
import Schedule from "./Schedule";

// Associations
Pet.hasMany(Schedule, { foreignKey: "petId", as: "schedules" });
Schedule.belongsTo(Pet, { foreignKey: "petId" });

export { Pet, Schedule };