const { mongoose } = require("mongoose");
const Consultancy = require("./../models/consultancy"); // Assuming the model name is 'Consultancy'
const asyncHandler = require("express-async-handler");

// Get all consultancy records for a specific faculty member
const getConsultancies = asyncHandler(async (req, res) => {
  if (!req.params.facultyName) {
    return res.status(400).json({ message: "Faculty Name Missing" });
  }
  const consultancies = await Consultancy.find({
    facultyName: req.params.facultyName,
  }).exec();
  
  if (!consultancies || consultancies.length === 0) {
    return res.status(404).json({
      message: `No Consultancy records found for ${req.params.facultyName}`,
    });
  }
  res.json(consultancies);
});

// Get all consultancy records
const getAllConsultancies = asyncHandler(async (req, res) => {
  const consultancies = await Consultancy.find().exec();
  
  if (!consultancies || consultancies.length === 0) {
    return res.status(404).json({
      message: "No Consultancy records found",
    });
  }
  res.json(consultancies);
});

// Get a specific consultancy record by its ID
const getConsultancy = asyncHandler(async (req, res) => {
  if (!req.params.consultancyId) {
    return res
      .status(400)
      .json({ message: "Incomplete Request: Params Missing" });
  }
  const consultancy = await Consultancy.findById(req.params.consultancyId).exec();
  
  if (!consultancy) {
    return res.status(404).json({
      message: `No Consultancy record found with ID ${req.params.consultancyId}`,
    });
  }
  res.json(consultancy);
});

// Add a new consultancy record
const addConsultancy = asyncHandler(async (req, res) => {
  const {
    facultyName,
    organization,
    datesOrDuration,
    amountGenerated,
    projectTitle,
    proofs,
  } = req.body;

  // Confirm Data
  if (
    !facultyName ||
    !organization ||
    !datesOrDuration ||
    !amountGenerated ||
    !projectTitle ||
    !proofs
  ) {
    return res
      .status(400)
      .json({ message: "Incomplete Request: Fields Missing" });
  }

  // Create and Store New Consultancy Record
  const consultancy = await Consultancy.create({
    facultyName,
    organization,
    datesOrDuration,
    amountGenerated,
    projectTitle,
    proofs,
  });

  if (consultancy) {
    res.status(201).json({
      message: `New Consultancy record for ${facultyName} added`,
    });
  } else {
    res.status(400).json({ message: "Invalid data received" });
  }
});

// Delete a consultancy record by its ID
const deleteConsultancy = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Consultancy ID required" });
  }

  const consultancy = await Consultancy.findById(id).exec();

  if (!consultancy) {
    return res.status(404).json({ message: "Consultancy record not found" });
  }

  await consultancy.deleteOne();

  res.json({ message: `Consultancy record ${id} deleted` });
});

module.exports = {
  addConsultancy,
  getAllConsultancies,
  getConsultancies,
  getConsultancy,
  deleteConsultancy,
};
