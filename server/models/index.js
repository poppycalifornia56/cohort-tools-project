const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/cohort-tools-api")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

module.exports = mongoose;
