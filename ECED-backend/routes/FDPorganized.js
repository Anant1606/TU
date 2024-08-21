const express = require('express');
const router = express.Router();
const {
  addProgram,
  getAllPrograms,
  getProgramsByTeacher,
  getProgram,
  deleteProgram,
} = require('../controllers/FDPorganized');
const protect = require('../middleware/authMiddleware'); // Assuming you have an auth middleware to protect routes

// Route to add a new program
router.post('/', protect, addProgram);

// Route to get all programs
router.get('/', protect, getAllPrograms);

// Route to get programs by a specific teacher
router.get('/teacher/:teacherId', protect, getProgramsByTeacher);

// Route to get a specific program by its ID
router.get('/:programId', protect, getProgram);

// Route to delete a program by its ID
router.delete('/', protect, deleteProgram);

module.exports = router;
