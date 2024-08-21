const express = require("express");
const router = express.Router();
const {
  addProgram,
  getAllPrograms,
  getPrograms,
  getProgram,
  deleteProgram,
} = require("./../controllers/programController");

// Route to add a new program
router.post("/add", addProgram);

// Route to get all programs
router.get("/all", getAllPrograms);

// Route to get all programs for a specific teacher by teacher ID
router.get("/teacher/:teacherId", getPrograms);

// Route to get a specific program by its ID
router.get("/:programId", getProgram);

// Route to delete a program by its ID
router.delete("/delete", deleteProgram);

module.exports = router;
