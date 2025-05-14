const mongoose = require("mongoose");

const cohortSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
    },
    cohortSlug: {
      type: String,
      required: true,
      unique: true,
    },
    cohortName: {
      type: String,
      required: true,
    },
    program: {
      type: String,
      required: true,
    },
    format: {
      type: String,
    },
    campus: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    inProgress: {
      type: Boolean,
      default: true,
    },
    programManager: {
      type: String,
    },
    leadTeacher: {
      type: String,
    },
    totalHours: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Cohort = mongoose.model("Cohort", cohortSchema);

module.exports = Cohort;
