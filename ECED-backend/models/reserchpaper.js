const mongoose = require("mongoose");

// Individual Paper in a Course
const respaperSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  paper: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  issnno: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true, // Ensure a teacher is always associated
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Ensure the model is defined only once
const ResPaper = mongoose.models.resPaper || mongoose.model("resPaper", respaperSchema);

module.exports = ResPaper;
