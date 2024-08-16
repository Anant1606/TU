const mongoose = require("mongoose");

// Fellowship Schema
const fellowshipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  financialSupport: {
    type: Number, // Amount in INR
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  stature: {
    type: String,
    enum: ["National", "International"],
    required: true,
  },
  awardingAgency: {
    type: String,
    required: true,
  },
  yearOfAward: {
    type: String, // You can change to Number if you want to enforce a numeric year
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  proofLink: {
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher", // Reference to the Teacher model
  },
});

module.exports = mongoose.model("Fellowship", fellowshipSchema);
