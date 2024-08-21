const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Professional Development Programmes', 'Orientation/Induction Programmes', 'Refresher Course', 'Short Term Course'],
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
  proofLink: {
    type: String,
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

const Program = mongoose.model('Program', programSchema);

module.exports = Program;
