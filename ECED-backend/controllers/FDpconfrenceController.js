const mongoose = require("mongoose");
const Program = require("./../models/FDPconfrence"); // Assuming the model name is 'Program'
const asyncHandler = require("express-async-handler");

// Get all programs for a specific teacher
const getPrograms = asyncHandler(async (req, res) => {
  if (!req.params.teacherId) {
    return res.status(400).json({ message: "Teacher ID Missing" });
  }
  const programs = await Program.find({
    teacher: req.params.teacherId,
  }).exec();
  
  if (!programs || programs.length === 0) {
    return res.status(404).json({
      message: `No Program(s) found`,
    });
  }
  res.json(programs);
});

// Get all programs with teacher details
const getAllPrograms = asyncHandler(async (req, res) => {
  const programs = await Program.aggregate([
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
        type: 1,
        duration: 1,
        startDate: 1,
        endDate: 1,
        organizingInstitution: 1,
        proofLink: 1,
        "teacher.name": 1,
      },
    },
  ]);

  if (!programs || programs.length === 0) {
    return res.status(404).json({
      message: `No Program(s) found`,
    });
  }
  res.json(programs);
});

// Get a specific program by its ID
const getProgram = asyncHandler(async (req, res) => {
  if (!req.params.programId) {
    return res
      .status(400)
      .json({ message: "Incomplete Request: Params Missing" });
  }
  const program = await Program.findOne({
    _id: req.params.programId,
  })
    .populate({ path: "teacher", select: "name" })
    .exec();

  if (!program) {
    return res.status(404).json({
      message: `No Program found with ID ${req.params.programId}`,
    });
  }
  res.json(program);
});

// Add a new program
const addProgram = asyncHandler(async (req, res) => {
  const { type, duration, startDate, endDate, organizingInstitution, proofLink, teacherId } = req.body;

  // Confirm Data
  if (!type || !duration || !startDate || !endDate || !organizingInstitution || !proofLink || !teacherId) {
    return res
      .status(400)
      .json({ message: "Incomplete Request: Fields Missing" });
  }

  // Check for Duplicates
  const duplicate = await Program.findOne({
    type,
    startDate,
    endDate,
    teacher: teacherId,
  }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Program already exists" });
  }

  const programObj = {
    type,
    duration,
    startDate,
    endDate,
    organizingInstitution,
    proofLink,
    teacher: teacherId,
  };

  // Create and Store New Program
  const program = await Program.create(programObj);

  if (program) {
    res.status(201).json({
      message: `New Program ${type} added`,
    });
  } else {
    res.status(400).json({ message: "Invalid data received" });
  }
});

// Delete a program by its ID
const deleteProgram = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Program ID required" });
  }

  const program = await Program.findById(id).exec();

  if (!program) {
    return res.status(404).json({ message: "Program not found" });
  }

  await program.deleteOne();

  res.json({ message: `Program ${id} deleted` });
});

module.exports = {
  addProgram,
  getAllPrograms,
  getPrograms,
  getProgram,
  deleteProgram,
};
