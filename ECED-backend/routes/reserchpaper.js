const express = require('express');
const router = express.Router();
const {
    addPaper,
    getAllPapers,
    getResearchPapers,
    getPaper,
    deletePaper,
} = require('../controllers/resPaper');

// Route for adding a research paper
router.post('/research-paper', addPaper);

// Route for getting all research papers
router.get('/research-paper', getAllPapers);

// Route for getting research papers for a specific teacher
router.get('/research-paper/teacher/:teacherId', getResearchPapers);

// Route for getting a specific research paper
router.get('/research-paper/:respaperId', getPaper);

// Route for deleting a research paper
router.delete('/research-paper/:respaperId', deletePaper);

module.exports = router;
