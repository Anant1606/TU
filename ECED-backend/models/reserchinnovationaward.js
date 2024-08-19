const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
  awardName: {
    type: String,
    required: true,
  },
  awardingBody: {
    type: String,
    required: true,
  },
  category: {
    type: String, // Category like innovation, technology transfer, etc.
    required: true,
  },
  yearOfAward: {
    type: Number, // Year when the award was received
    required: true,
  },
  cashPrize: {
    type: Number, // Amount of the cash prize, if any
  },
  proofLink: {
    type: String, // URL link to the award letter or proof document
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true, // Ensure that an award is always associated with a teacher
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Award', awardSchema);
