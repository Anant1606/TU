const express = require("express");
const router = express.Router();
const {
  addAward,
  getAllAwards,
  getAwards,
  getAward,
  deleteAward,
} = require("./../controllers/reserchinnovationawardcontroller"); // Adjust the path to your controller file

// Route to get all awards
router.get("/", getAllAwards);

// Route to get awards for a specific teacher
router.get("/teacher/:teacherId", getAwards);

// Route to get a specific award by ID
router.get("/:awardId", getAward);

// Route to add a new award
router.post("/", addAward);

// Route to delete an award by ID
router.delete("/", deleteAward);

module.exports = router;
