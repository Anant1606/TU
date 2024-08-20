const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseModule: {
      type: String, // Name or title of the course module
      required: true,
    },
    platform: {
      type: String, // Platform on which the course is hosted (e.g., Coursera, Udemy)
      required: true,
    },
    dateOfLaunch: {
      type: Date, // Date when the course was launched
      required: true,
    },
    proofLink: {
      type: String, // Link to the E-content or proof
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the Teacher model
      ref: "Teacher", // Assuming the teacher model is named 'Teacher'
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
