const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      'Professional Development Programmes', 
      'Orientation/Induction Programmes', 
      'Refresher Course', 
      'Short Term Course'
    ],
    required: true,
  },
  duration: {
    type: Number, // Duration in days
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
  organizingInstitution: {
    type: String,
    required: true,
  },
  fundingSupport: {
    type: Boolean, // Whether funding support is available or not
    required: true,
  },
  nameOfAgency: {
    type: String, // Name of the agency providing funding support
    required: function () {
      return this.fundingSupport; // Required only if funding support is true
    },
  },
  amountSupport: {
    type: Number, // Amount of support in INR
    required: function () {
      return this.fundingSupport; // Required only if funding support is true
    },
  },
  proof: {
    type: String, // Link to certificate, sanction letter, approval letter, etc.
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

const Program = mongoose.model("Program", programSchema);

module.exports = Program;
