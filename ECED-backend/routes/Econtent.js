const express = require('express');
const router = express.Router();
const {
  addCourse,
  getAllCourses,
  getCourses,
  getCourse,
  deleteCourse,
} = require('./../controllers/Eontent');

// Route to get all courses for a specific teacher
router.get('/courses/teacher/:teacherId', getCourses);

// Route to get all courses with teacher details
router.get('/courses', getAllCourses);

// Route to get a specific course by its ID
router.get('/course/:courseId', getCourse);

// Route to add a new course
router.post('/course', addCourse);

// Route to delete a course by its ID
router.delete('/course', deleteCourse);

module.exports = router;
