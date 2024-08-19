const mongoose = require("mongoose");

const researchProjectSchema = new mongoose.Schema(
  {
    pi: {
      type: String, // Principal Investigator's name
      required: true,
    },
    co_pi: {
      type: String, // Co-Principal Investigator's name (optional)
    },
    title: {
      type: String, // Title of the research project
      required: true,
    },
    fundingAgency: {
      type: String, // Name of the funding agency
      required: true,
    },
    duration: {
      type: String, // Duration of the project (e.g., "2 years")
    },
    yearOfAward: {
      type: Number, // Year when the project was awarded
      required: true,
    },
    amount: {
      type: Number, // Funding amount received
      required: true,
    },
    startDate: {
      type: Date, // Project start date
      required: true,
    },
    endDate: {
      type: Date, // Project end date
      required: true,
    },
    status: {
      type: String, // Status of the project (e.g., "Ongoing", "Completed")
      required: true,
    },
    proofs: [
      {
        type: String, // URL link to proof documents
        required: true,
      },
    ],
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher", // Reference to the Teacher model
      required: true, // Ensure that a project is always associated with a teacher
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const ResearchProject = mongoose.model("ResearchProject", researchProjectSchema);

module.exports = ResearchProject;
