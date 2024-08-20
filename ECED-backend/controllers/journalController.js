const JournalPaper = require("./../models/Journal");
const asyncHandler = require("express-async-handler");

// Get all journal papers for a specific teacher
const getJournalPapersByTeacher = asyncHandler(async (req, res) => {
  if (!req.params.teacherId) {
    return res.status(400).json({ message: "Teacher ID Missing" });
  }
  const journalPapers = await JournalPaper.find({
    teacher: req.params.teacherId,
  }).exec();

  if (!journalPapers || journalPapers.length === 0) {
    return res.status(404).json({ message: "No Journal Paper(s) found" });
  }

  res.json(journalPapers);
});

// Get all journal papers
const getAllJournalPapers = asyncHandler(async (req, res) => {
  const papers = await JournalPaper.aggregate([
    {
      $lookup: {
        from: "teachers",
        localField: "teacher",
        foreignField: "_id",
        as: "teacher",
      },
    },
    {
      $unwind: "$teacher",
    },
    {
      $project: {
        title: 1,
        authors: 1,
        withUGStudents: 1,
        withPGStudents: 1,
        withPhDStudents: 1,
        withFaculty: 1,
        studentNames: 1,
        facultyNames: 1,
        journalIndexing: 1,
        journalName: 1,
        yearOfPublication: 1,
        issnNumber: 1,
        journalWebsiteLink: 1,
        articleLink: 1,
        impactFactor: 1,
        doi: 1,
        proof: 1,
        "teacher.name": 1,
      },
    },
  ]);

  if (!papers || papers.length === 0) {
    return res.status(404).json({ message: "No Journal Paper(s) found" });
  }

  res.json(papers);
});

// Get a single journal paper by ID
const getJournalPaperById = asyncHandler(async (req, res) => {
  if (!req.params.paperId) {
    return res.status(400).json({ message: "Incomplete Request: Params Missing" });
  }

  const paper = await JournalPaper.findById(req.params.paperId)
    .populate({ path: "teacher", select: "name" })
    .exec();

  if (!paper) {
    return res.status(404).json({ message: "No Journal Paper(s) found" });
  }

  res.json(paper);
});

// Add a new journal paper
const addJournalPaper = asyncHandler(async (req, res) => {
  const {
    title,
    authors,
    withUGStudents,
    withPGStudents,
    withPhDStudents,
    withFaculty,
    studentNames,
    facultyNames,
    journalIndexing,
    journalName,
    yearOfPublication,
    issnNumber,
    journalWebsiteLink,
    articleLink,
    impactFactor,
    doi,
    proof,
    teacher,
  } = req.body;

  // Confirm Data
  if (!title || !authors || !journalName || !yearOfPublication || !proof || !teacher) {
    return res.status(400).json({ message: "Incomplete Request: Fields Missing" });
  }

  // Check for Duplicates
  const duplicate = await JournalPaper.findOne({
    title,
    authors,
    journalName,
    yearOfPublication,
    teacher,
  }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Paper already exists" });
  }

  const paperObj = {
    title,
    authors,
    withUGStudents,
    withPGStudents,
    withPhDStudents,
    withFaculty,
    studentNames,
    facultyNames,
    journalIndexing,
    journalName,
    yearOfPublication,
    issnNumber,
    journalWebsiteLink,
    articleLink,
    impactFactor,
    doi,
    proof,
    teacher,
  };

  // Create and Store New Journal Paper
  const record = await JournalPaper.create(paperObj);

  if (record) {
    res.status(201).json({ message: `New Journal Paper "${title}" added` });
  } else {
    res.status(400).json({ message: "Invalid data received" });
  }
});

// Delete a journal paper
const deleteJournalPaper = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Journal Paper ID required" });
  }

  const record = await JournalPaper.findById(id).exec();

  if (!record) {
    return res.status(404).json({ message: "Journal Paper not found" });
  }

  await record.deleteOne();

  res.json({ message: `Journal Paper "${record.title}" deleted` });
});

module.exports = {
  addJournalPaper,
  getAllJournalPapers,
  getJournalPapersByTeacher,
  getJournalPaperById,
  deleteJournalPaper,
};
