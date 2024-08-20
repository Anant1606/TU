const express = require('express');
const router = express.Router();
const {
  addConsultancy,
  getAllConsultancies,
  getConsultancies,
  getConsultancy,
  deleteConsultancy,
} = require('./../controllers/consultancyController');

// Route to get all consultancy records
router.get('/', getAllConsultancies);

// Route to get consultancy records for a specific faculty member
router.get('/:facultyName', getConsultancies);

// Route to get a specific consultancy record by its ID
router.get('/id/:consultancyId', getConsultancy);

// Route to add a new consultancy record
router.post('/', addConsultancy);

// Route to delete a consultancy record by its ID
router.delete('/', deleteConsultancy);

module.exports = router;
