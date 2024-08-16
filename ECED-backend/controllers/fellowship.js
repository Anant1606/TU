const asyncHandler = require("express-async-handler");
const Fellowship = require("../models/fellowship"); // Assuming the model name is 'Fellowship'

// Get all fellowships for a specific teacher
const getFellowships = asyncHandler(async (req, res) => {
  if (!req.params.teacherId) {
    return res.status(400).json({ message: "Teacher ID is missing" });
  }

  const fellowships = await Fellowship.find({ teacher: req.params.teacherId }).exec();

  if (!fellowships || fellowships.length === 0) {
    return res.status(404).json({ message: "No Fellowships found" });
  }

  res.json(fellowships);
});

// Get all fellowships with teacher details
const getAllFellowships = asyncHandler(async (req, res) => {
  const fellowships = await Fellowship.aggregate([
    {
      $lookup: {
        from: "teachers", // The name of the Teacher collection
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
        name: 1,
        financialSupport: 1,
        purpose: 1,
        stature: 1,
        awardingAgency: 1,
        yearOfAward: 1,
        unit: 1,
        proofLink: 1,
        "teacher.name": 1, // Include teacher's name
      },
    },
  ]);

  if (!fellowships || fellowships.length === 0) {
    return res.status(404).json({ message: "No Fellowships found" });
  }

  res.json(fellowships);
});

// Get a specific fellowship by ID
const getFellowship = asyncHandler(async (req, res) => {
  if (!req.params.fellowshipId) {
    return res.status(400).json({ message: "Fellowship ID is missing" });
  }

  const fellowship = await Fellowship.findById(req.params.fellowshipId)
    .populate({ path: "teacher", select: "name" })
    .exec();

  if (!fellowship) {
    return res.status(404).json({ message: "Fellowship not found" });
  }

  res.json(fellowship);
});

// Add a new fellowship
const addFellowship = asyncHandler(async (req, res) => {
  const {
    name,
    financialSupport,
    purpose,
    stature,
    awardingAgency,
    yearOfAward,
    unit,
    proofLink,
    teacher,
  } = req.body;

  // Confirm data
  if (
    !name ||
    !financialSupport ||
    !purpose ||
    !stature ||
    !awardingAgency ||
    !yearOfAward ||
    !unit ||
    !proofLink ||
    !teacher
  ) {
    return res.status(400).json({ message: "Incomplete Request: Fields Missing" });
  }

  // Check for duplicates
  const duplicate = await Fellowship.findOne({
    name,
    financialSupport,
    teacher,
  })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Fellowship already exists" });
  }

  // Create and store new fellowship
  const fellowshipObj = {
    name,
    financialSupport,
    purpose,
    stature,
    awardingAgency,
    yearOfAward,
    unit,
    proofLink,
    teacher,
  };

  const record = await Fellowship.create(fellowshipObj);

  if (record) {
    res.status(201).json({ message: `New Fellowship ${name} added` });
  } else {
    res.status(400).json({ message: "Invalid data received" });
  }
});

// Delete a fellowship by ID
const deleteFellowship = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Fellowship ID required" });
  }

  const record = await Fellowship.findById(id).exec();

  if (!record) {
    return res.status(404).json({ message: "Fellowship not found" });
  }

  await record.deleteOne();

  res.json({ message: `${id} deleted` });
});

module.exports = {
  addFellowship,
  getAllFellowships,
  getFellowships,
  getFellowship,
  deleteFellowship,
};
