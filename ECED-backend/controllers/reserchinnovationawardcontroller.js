const mongoose = require("mongoose");
const Award = require("./../models/reserchinnovationaward"); // Adjust the path to your model file
const asyncHandler = require("express-async-handler");

// Get awards for a specific teacher
const getAwards = asyncHandler(async (req, res) => {
  if (!req.params.teacherId) {
    return res.status(400).json({ message: "Teacher ID Missing" });
  }
  const awards = await Award.find({
    teacher: req.params.teacherId,
  }).exec();
  if (!awards || awards.length === 0) {
    return res.status(404).json({
      message: "No Awards found",
    });
  }
  res.json(awards);
});

// Get all awards
const getAllAwards = asyncHandler(async (req, res) => {
  const awards = await Award.aggregate([
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
        awardName: 1,
        awardingBody: 1,
        category: 1,
        yearOfAward: 1,
        cashPrize: 1,
        proofLink: 1,
        "teacher.name": 1,
      },
    },
  ]);
  if (!awards || awards.length === 0) {
    return res.status(404).json({
      message: "No Awards found",
    });
  }
  res.json(awards);
});

// Get a specific award by ID
const getAward = asyncHandler(async (req, res) => {
  if (!req.params.awardId) {
    return res.status(400).json({ message: "Incomplete Request: Params Missing" });
  }
  const award = await Award.findOne({ _id: req.params.awardId })
    .populate({ path: "teacher", select: "name" })
    .exec();
  if (!award) {
    return res.status(404).json({
      message: "Award not found",
    });
  }
  res.json(award);
});

// Add a new award
const addAward = asyncHandler(async (req, res) => {
  const { awardName, awardingBody, category, yearOfAward, cashPrize, proofLink, teacher } = req.body;

  // Confirm Data
  if (!awardName || !awardingBody || !category || !yearOfAward || !proofLink || !teacher) {
    return res.status(400).json({ message: "Incomplete Request: Fields Missing" });
  }

  // Check for Duplicates
  const duplicate = await Award.findOne({
    awardName,
    awardingBody,
    yearOfAward,
  }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Award already exists" });
  }

  const awardObj = {
    awardName,
    awardingBody,
    category,
    yearOfAward,
    cashPrize,
    proofLink,
    teacher,
  };

  // Create and Store New Award
  const record = await Award.create(awardObj);

  if (record) {
    res.status(201).json({
      message: `New Award ${awardName} added`,
    });
  } else {
    res.status(400).json({ message: "Invalid data received" });
  }
});

// Delete an award by ID
const deleteAward = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Award ID required" });
  }

  const record = await Award.findById(id).exec();

  if (!record) {
    return res.status(404).json({ message: "Award not found" });
  }

  await record.deleteOne();

  res.json({ message: `${id} deleted` });
});

module.exports = {
  addAward,
  getAllAwards,
  getAwards,
  getAward,
  deleteAward,
};
