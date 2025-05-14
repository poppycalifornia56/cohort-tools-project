const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  _id: {
    type: Number 
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String
  },
  linkedinUrl: {
    type: String
  },
  languages: {
    type: [String]
  },
  program: {
    type: String,
    required: true
  },
  background: {
    type: String
  },
  image: {
    type: String
  },
  cohort: {
    type: mongoose.Schema.Types.Number,
    ref: 'Cohort'
  },
  projects: {
    type: [Object],
    default: []
  }
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;