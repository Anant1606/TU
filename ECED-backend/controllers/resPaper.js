const mongoose = require("mongoose"); // Correct import
const ResearchPaper = require("./../models/reserchpaper"); // Make sure the model name is correct
const asyncHandler = require("express-async-handler");

const getResearchPapers = asyncHandler(async (req, res) => {
  if (!req.params.teacherId) {
    return res.status(400).json({ message: "Teacher ID Missing" });
  }
  
  const researchPapers = await ResearchPaper.find({
    teacher: req.params.teacherId,
  })
    .select("-students")
    .exec();
  
  if (!researchPapers || researchPapers.length === 0) {
    return res.status(404).json({
      message: `No Research Paper(s) found`,
    });
  }
  
  res.json(researchPapers);
});

const getAllPapers = asyncHandler(async (req, res) => {
  const studentId = req.params.studentId;



  const papers = await ResearchPaper.aggregate([
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
        semester: 1,
        year: 1,
        paper: 1,
        "teacher.name": 1,
        students: 1,
        department: 1,
        joined: {
          $cond: {
            if: { $isArray: "$students" }, // Check if 'students' is an array
            then: { $in: [new mongoose.Types.ObjectId(studentId), "$students"] },
            else: false // Return false if not an array
          }
        },
      },
    },
  ]);

  if (!papers || papers.length === 0) {
    return res.status(404).json({
      message: `No Paper(s) found`,
    });
  }

  res.json(papers);
});

const getPaper = asyncHandler(async (req, res) => {
  if (!req.params.respaperId) {
    return res
      .status(400)
      .json({ message: "Incomplete Request: Params Missing" });
  }

  const paper = await ResearchPaper.findOne({
    _id: req.params.respaperId,
  })
    .populate({ path: "teacher", select: "name" }) // Populate only the teacher as per your schema
    .exec();

  if (!paper) {
    return res.status(404).json({
      message: "No Paper(s) found",
    });
  }

  res.json(paper);
});





const addPaper = asyncHandler(async (req, res) => {
  const { department, semester, year, paper, students, teacher, title, issnno, publisher, link } = req.body;

  // Confirm Data
  if (!department || !paper || !year || !teacher || !title || !issnno || !publisher || !link) {
    return res.status(400).json({ message: "Incomplete Request: Fields Missing" });
  }

  // Check for Duplicates
  const duplicate = await ResearchPaper.findOne({
    department,
    paper,
    students,
    teacher,
  }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Paper already exists" });
  }

  const paperObj = {
    department,
    paper,
    year,
    teacher,
    title,
    issnno,
    publisher,
    link,
  };

  // Create and Store New Paper
  const record = await ResearchPaper.create(paperObj);

  if (record) {
    res.status(201).json({
      message: `New Paper ${paper} added `,
    });
  } else {
    res.status(400).json({ message: "Invalid data received" });
  }
});

const deletePaper = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Paper ID required" });
  }

  const record = await ResearchPaper.findById(id).exec();

  if (!record) {
    return res.status(404).json({ message: "Paper not found" });
  }

  await record.deleteOne();

  res.json({ message: `${id} deleted` });
});

module.exports = {
  addPaper,
  getAllPapers,
  getResearchPapers,
  getPaper,
  deletePaper,
};
