const express = require('express');
const router = express.Router();
const {
  addConferencePublication,
  getAllConferencePublications,
  getConferencePublicationsByTeacher,
  getConferencePublication,
  deleteConferencePublication,
} = require('./../controllers/ConfrenceCntroller'); // Adjust path as needed

// Route to add a new conference publication
router.post('/add', addConferencePublication);

// Route to get all conference publications
router.get('/all', getAllConferencePublications);

// Route to get conference publications by a specific teacher's ID
router.get('/by-teacher/:teacherId', getConferencePublicationsByTeacher);

// Route to get a specific conference publication by ID
router.get('/:publicationId', getConferencePublication);

// Route to delete a conference publication by ID
router.delete('/delete', deleteConferencePublication);

module.exports = router;
