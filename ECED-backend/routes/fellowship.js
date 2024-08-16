const express = require('express');
const router = express.Router();
const {
  addFellowship,
  getAllFellowships,
  getFellowships,
  getFellowship,
  deleteFellowship,
} = require('../controllers/fellowship');

// Route for adding a fellowship
router.post('/fellowship', addFellowship);

// Route for getting all fellowships
router.get('/fellowship', getAllFellowships);

// Route for getting fellowships for a specific teacher
router.get('/fellowship/teacher/:teacherId', getFellowships);

// Route for getting a specific fellowship
router.get('/fellowship/:fellowshipId', getFellowship);

// Route for deleting a fellowship
router.delete('/fellowship/:fellowshipId', deleteFellowship);

module.exports = router;
