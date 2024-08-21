const express = require('express');
const router = express.Router();
const {
  addProgram,
  getAllPrograms,
  getProgramsByTeacher,
  getProgram,
  deleteProgram,
} = require('../controllers/FDPorganized');

// Route to add a new program
router.post('/', addProgram);

// Route to get all programs
router.get('/',  getAllPrograms);

// Route to get programs by a specific teacher
router.get('/teacher/:teacherId', getProgramsByTeacher);

// Route to get a specific program by its ID
router.get('/:programId', getProgram);

// Route to delete a program by its ID
router.delete('/', deleteProgram);

module.exports = router;
