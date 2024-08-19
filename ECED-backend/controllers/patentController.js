const { mongoose } = require("mongoose");
const Patent = require("./../models/patent"); // Adjust the path to your model file
const asyncHandler = require("express-async-handler");

// Get all patents
const getAllPatents = asyncHandler(async (req, res) => {
  const patents = await Patent.find().populate("teacher", "name").exec();
  if (!patents || patents.length === 0) {
    return res.status(404).json({
      message: "No Patents found",
    });
  }
  res.json(patents);
});

// Get patents for a specific awarding agency
const getPatentsByAgency = asyncHandler(async (req, res) => {
  if (!req.params.agencyName) {
    return res.status(400).json({ message: "Agency Name Missing" });
  }
  const patents = await Patent.find({
    awardingAgency: req.params.agencyName,
  })
    .populate("teacher", "name")
    .exec();
  if (!patents || patents.length === 0) {
    return res.status(404).json({
      message: "No Patents found for the specified agency",
    });
  }
  res.json(patents);
});

// Get a specific patent by ID
const getPatent = asyncHandler(async (req, res) => {
  if (!req.params.patentId) {
    return res
      .status(400)
      .json({ message: "Incomplete Request: Params Missing" });
  }
  const patent = await Patent.findOne({ _id: req.params.patentId })
    .populate("teacher", "name")
    .exec();
  if (!patent) {
    return res.status(404).json({
      message: "Patent not found",
    });
  }
  res.json(patent);
});

// Add a new patent
const addPatent = asyncHandler(async (req, res) => {
  const { patentNumber, dateOfAward, awardingAgency, status, proof } = req.body;

  // Confirm Data
  if (!patentNumber || !dateOfAward || !awardingAgency || !status || !proof) {
    return res.status(400).json({ message: "Incomplete Request: Fields Missing" });
  }

  // Check for Duplicates
  const duplicate = await Patent.findOne({ patentNumber }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Patent already exists" });
  }

  // Get the logged-in teacher's ID
  const teacherId = req.user._id;

  const patentObj = {
    patentNumber,
    dateOfAward,
    awardingAgency,
    status,
    proof,
    teacher: teacherId, // Associate the logged-in teacher with the patent
  };

  // Create and Store New Patent
  const record = await Patent.create(patentObj);

  if (record) {
    res.status(201).json({
      message: `New Patent ${patentNumber} added`,
    });
  } else {
    res.status(400).json({ message: "Invalid data received" });
  }
});

// Delete a patent by ID
const deletePatent = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Patent ID required" });
  }

  const record = await Patent.findById(id).exec();

  if (!record) {
    return res.status(404).json({ message: "Patent not found" });
  }

  await record.deleteOne();

  res.json({ message: `${id} deleted` });
});

module.exports = {
  addPatent,
  getAllPatents,
  getPatentsByAgency,
  getPatent,
  deletePatent,
};
