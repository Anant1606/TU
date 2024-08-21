const Program = require("../models/FDPorganized"); // Assuming the model name is 'Program'
const asyncHandler = require("express-async-handler");

// Fetch programs by teacher ID
const getProgramsByTeacher = asyncHandler(async (req, res) => {
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

// Fetch all programs
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
        fundingSupport: 1,
        nameOfAgency: 1,
        amountSupport: 1,
        proof: 1,
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

// Fetch a specific program by ID
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
      message: `No Program found`,
    });
  }
  res.json(program);
});

// Add a new program
const addProgram = asyncHandler(async (req, res) => {
  const {
    type,
    duration,
    startDate,
    endDate,
    organizingInstitution,
    fundingSupport,
    nameOfAgency,
    amountSupport,
    proof,
  } = req.body;

  // Confirm Data
  if (!type || !duration || !startDate || !endDate || !organizingInstitution || !proof) {
    return res.status(400).json({ message: "Incomplete Request: Fields Missing" });
  }

  // Automatically associate the teacher from the authenticated user
  const teacherId = req.user._id; // Assuming the user is authenticated and req.user contains the teacher's ID

  // Create and Store New Program
  const programObj = {
    type,
    duration,
    startDate,
    endDate,
    organizingInstitution,
    fundingSupport,
    nameOfAgency,
    amountSupport,
    proof,
    teacher: teacherId,
  };

  const program = await Program.create(programObj);

  if (program) {
    res.status(201).json({ message: `New Program added successfully`, program });
  } else {
    res.status(400).json({ message: "Invalid data received" });
  }
});

// Delete a program by ID
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

  res.json({ message: `${id} deleted` });
});

module.exports = {
  addProgram,
  getAllPrograms,
  getProgramsByTeacher,
  getProgram,
  deleteProgram,
};
