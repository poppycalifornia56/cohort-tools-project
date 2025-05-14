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

    await Cohort.insertMany(cohorts);
    console.log("Inserted cohort data");

    await Student.insertMany(students);
    console.log("Inserted student data");

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
