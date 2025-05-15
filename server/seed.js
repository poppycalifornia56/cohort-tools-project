const mongoose = require("mongoose");
const Cohort = require("./models/cohort.model");
const Student = require("./models/student.model");
const cohorts = require("./cohorts.json");
const students = require("./students.json");

mongoose
  .connect("mongodb://localhost:27017/cohort-tools-api")
  .then(() => console.log("Connected to MongoDB for seeding"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });

const seedDatabase = async () => {
  try {
    await Cohort.deleteMany({});
    await Student.deleteMany({});
    console.log("Cleared existing data");

    const processedCohorts = cohorts.map((cohort) => ({
      ...cohort,
      _id: mongoose.Types.ObjectId(cohort._id),
    }));

    await Cohort.insertMany(processedCohorts);
    console.log("Inserted cohort data");

    const processedStudents = students.map((student) => ({
      ...student,
      _id: mongoose.Types.ObjectId(student._id),
      cohort: mongoose.Types.ObjectI,
    }));

    await Student.insertMany(processedStudents);
    console.log("Inserted student data with proper references");

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
