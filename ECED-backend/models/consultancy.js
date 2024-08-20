const mongoose = require("mongoose");

const consultancySchema = new mongoose.Schema(
  {
    facultyName: {
      type: String, // Name of the faculty consultant or trainer
      required: true,
    },
    organization: {
      type: String, // Organization to which consultancy or corporate training provided
      required: true,
    },
    datesOrDuration: {
      type: String, // Dates or duration of consultancy
      required: true,
    },
    amountGenerated: {
      type: Number, // Amount generated in INR
      required: true,
    },
    projectTitle: {
      type: String, // Title of the research project or project work
      required: true,
    },
    proofs: {
      type: [String], // Proofs (Approval/EoI/Sanction etc.)
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Consultancy = mongoose.model("Consultancy", consultancySchema);

module.exports = Consultancy;
