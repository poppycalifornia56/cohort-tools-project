const express = require("express");
const router = express.Router();
const Student = require("../models/student.model");

router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(parseInt(req.params.studentId));
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/cohort/:cohortId", async (req, res) => {
  try {
    const students = await Student.find({
      cohort: parseInt(req.params.cohortId),
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const student = new Student(req.body);

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:studentId", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      parseInt(req.params.studentId),
      req.body,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:studentId", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(
      parseInt(req.params.studentId)
    );

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
