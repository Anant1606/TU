const mongoose = require('mongoose');

const patentSchema = new mongoose.Schema({
  patentNumber: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfAward: {
    type: Date,
    required: true,
  },
  awardingAgency: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Published', 'Granted'],
    required: true,
  },
  proof: {
    type: String, // URL link to the proof of patent
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true, // Ensure that a patent is always associated with a teacher
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Check if the model is already compiled, if not, compile it
module.exports = mongoose.models.Patent || mongoose.model('Patent', patentSchema);
