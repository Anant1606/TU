const { mongoose } = require("mongoose");
const ResearchProject = require("./../models/reserchgrant"); // Assuming the model name is 'ResearchProject'
const asyncHandler = require("express-async-handler");

const getResearchProjects = asyncHandler(async (req, res) => {
  if (!req.params.teacherId) {
    return res.status(400).json({ message: "Teacher ID Missing" });
  }
  const researchProjects = await ResearchProject.find({
    teacher: req.params.teacherId,
  })
    .select("-students")
    .exec();
  if (!researchProjects || researchProjects.length === 0) {
    return res.status(404).json({
      message: "No Research Project(s) found",
    });
  }
  res.json(researchProjects);
});

const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await ResearchProject.aggregate([
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
        pi: 1,
        co_pi: 1,
        title: 1,
        fundingAgency: 1,
        duration: 1,
        yearOfAward: 1,
        amount: 1,
        startDate: 1,
        endDate: 1,
        status: 1,
        proofs: 1,
        "teacher.name": 1,
      },
    },
  ]);
  if (!projects || projects.length === 0) {
    return res.status(404).json({
      message: "No Project(s) found",
    });
  }
  res.json(projects);
});

const getProject = asyncHandler(async (req, res) => {
  if (!req.params.projectId) {
    return res
      .status(400)
      .json({ message: "Incomplete Request: Params Missing" });
  }
  const project = await ResearchProject.findOne({
    _id: req.params.projectId,
  })
    .populate({ path: "teacher", select: "name" })
    .exec();
  if (!project) {
    return res.status(404).json({
      message: "No Project(s) found",
    });
  }
  res.json(project);
});

const addProject = asyncHandler(async (req, res) => {
  const { pi, co_pi, title, fundingAgency, duration, yearOfAward, amount, startDate, endDate, status, proofs } = req.body;

  // Confirm Data
  if (!pi || !title || !fundingAgency || !yearOfAward || !amount || !startDate || !endDate || !status || !proofs) {
    return res
      .status(400)
      .json({ message: "Incomplete Request: Fields Missing" });
  }

  // Check for Duplicates
  const duplicate = await ResearchProject.findOne({
    pi,
    title,
    fundingAgency,
    yearOfAward,
  }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Project already exists" });
  }

  const projectObj = {
    pi,
    co_pi,
    title,
    fundingAgency,
    duration,
    yearOfAward,
    amount,
    startDate,
    endDate,
    status,
    proofs
  };

  // Create and Store New Project
  const record = await ResearchProject.create(projectObj);

  if (record) {
    res.status(201).json({
      message: `New Project ${title} added`,
    });
  } else {
    res.status(400).json({ message: "Invalid data received" });
  }
});

const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Project ID required" });
  }

  const record = await ResearchProject.findById(id).exec();

  if (!record) {
    return res.status(404).json({ message: "Project not found" });
  }

  await record.deleteOne();

  res.json({ message: `${id} deleted` });
});

module.exports = {
  addProject,
  getAllProjects,
  getResearchProjects,
  getProject,
  deleteProject,
};
