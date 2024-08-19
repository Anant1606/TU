const express = require("express");
const router = express.Router();
const {
  addJournalPaper,
  getAllJournalPapers,
  getJournalPapersByTeacher,
  getJournalPaperById,
  deleteJournalPaper,
} = require("../controllers/journalPaperController");

// Route to get all journal papers
router.get("/", getAllJournalPapers);

// Route to get all journal papers for a specific teacher
router.get("/teacher/:teacherId", getJournalPapersByTeacher);

// Route to get a single journal paper by ID
router.get("/:paperId", getJournalPaperById);

// Route to add a new journal paper
router.post("/", addJournalPaper);

// Route to delete a journal paper
router.delete("/", deleteJournalPaper);

module.exports = router;
