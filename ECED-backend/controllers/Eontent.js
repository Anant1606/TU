const mongoose = require("mongoose");
const Course = require("./../models/Econtent"); // Assuming the model name is 'Course'
const asyncHandler = require("express-async-handler");

// Get all courses for a specific teacher
const getCourses = asyncHandler(async (req, res) => {
  if (!req.params.teacherId) {
    return res.status(400).json({ message: "Teacher ID Missing" });
  }
  const courses = await Course.find({
    teacher: req.params.teacherId,
  }).exec();
  
  if (!courses || courses.length === 0) {
    return res.status(404).json({
      message: `No Course(s) found`,
    });
  }
  res.json(courses);
});

// Get all courses with teacher details
const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.aggregate([
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
        courseModule: 1,
        platform: 1,
        dateOfLaunch: 1,
        proofLink: 1,
        "teacher.name": 1,
      },
    },
  ]);
  
  if (!courses || courses.length === 0) {
    return res.status(404).json({
      message: `No Course(s) found`,
    });
  }
  res.json(courses);
});

// Get a specific course by its ID
const getCourse = asyncHandler(async (req, res) => {
  if (!req.params.courseId) {
    return res
      .status(400)
      .json({ message: "Incomplete Request: Params Missing" });
  }
  const course = await Course.findOne({
    _id: req.params.courseId,
  })
    .populate({ path: "teacher", select: "name" })
    .exec();
  
  if (!course) {
    return res.status(404).json({
      message: `No Course found with ID ${req.params.courseId}`,
    });
  }
  res.json(course);
});

// Add a new course
const addCourse = asyncHandler(async (req, res) => {
  const { courseModule, platform, dateOfLaunch, proofLink, teacherId } = req.body;

  // Confirm Data
  if (!courseModule || !platform || !dateOfLaunch || !proofLink || !teacherId) {
    return res
      .status(400)
      .json({ message: "Incomplete Request: Fields Missing" });
  }

  // Check for Duplicates
  const duplicate = await Course.findOne({
    courseModule,
    platform,
    teacher: teacherId,
  }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Course already exists" });
  }

  const courseObj = {
    courseModule,
    platform,
    dateOfLaunch,
    proofLink,
    teacher: teacherId,
  };

  // Create and Store New Course
  const course = await Course.create(courseObj);

  if (course) {
    res.status(201).json({
      message: `New Course ${courseModule} added`,
    });
  } else {
    res.status(400).json({ message: "Invalid data received" });
  }
});

// Delete a course by its ID
const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Course ID required" });
  }

  const course = await Course.findById(id).exec();

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  await course.deleteOne();

  res.json({ message: `Course ${id} deleted` });
});

module.exports = {
  addCourse,
  getAllCourses,
  getCourses,
  getCourse,
  deleteCourse,
};
