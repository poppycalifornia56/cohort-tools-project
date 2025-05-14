const express = require("express");
const router = express.Router();
const Cohort = require("../models/cohort.model");

router.get("/", async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.json(cohorts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:cohortId", async (req, res) => {
  try {
    const cohort = await Cohort.findById(parseInt(req.params.cohortId));
    if (!cohort) {
      return res.status(404).json({ message: "Cohort not found" });
    }
    res.json(cohort);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const cohort = new Cohort(req.body);

  try {
    const newCohort = await cohort.save();
    res.status(201).json(newCohort);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:cohortId", async (req, res) => {
  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(
      parseInt(req.params.cohortId),
      req.body,
      { new: true }
    );

    if (!updatedCohort) {
      return res.status(404).json({ message: "Cohort not found" });
    }

    res.json(updatedCohort);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:cohortId", async (req, res) => {
  try {
    const deletedCohort = await Cohort.findByIdAndDelete(
      parseInt(req.params.cohortId)
    );

    if (!deletedCohort) {
      return res.status(404).json({ message: "Cohort not found" });
    }

    res.json({ message: "Cohort deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
