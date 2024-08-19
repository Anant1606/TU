const express = require('express');
const router = express.Router();
const {
  addPatent,
  getAllPatents,
  getPatentsByAgency,
  getPatent,
  deletePatent,
} = require('../controllers/patentController'); // Adjust the path to your controller file

// Route for adding a new patent
router.post('/patent', addPatent);

// Route for getting all patents
router.get('/patent', getAllPatents);

// Route for getting patents by awarding agency
router.get('/patent/agency/:agencyName', getPatentsByAgency);

// Route for getting a specific patent by ID
router.get('/patent/:patentId', getPatent);

// Route for deleting a patent by ID
router.delete('/patent', deletePatent);

module.exports = router;
