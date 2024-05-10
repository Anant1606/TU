const mongoose = require("mongoose");

// Individual Paper in a Course
const respaperSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
  },

  year:{
    type: String,
    required: true,
  },
  paper:{
    type: String,
    required: true,
  },
  title:{
    type: String,
    required: true,
  },
 
 issnno:{
  type: String,
    required: true,
 },
 publisher:{
  type: String,
  required: true,
 },
 link :{
  type: String,
  required: true,
 },

  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
});

module.exports = mongoose.model("resPaper", respaperSchema);
