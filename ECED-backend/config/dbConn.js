const mongoose = require("mongoose");
const DATABASE_URI=`mongodb://127.0.0.1:27017/TU`;
const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URI);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
