const express = require("express");
const router = express.Router();
const teacherController = require("./../controllers/teacherController");

// Route for creating a new teacher
router.route("/").post(teacherController.createNewTeacher);

// Route for getting the list of teacher names by department
router.route("/list/:department").get(teacherController.getTeacherList);

// Route for getting new teachers by department
router.route("/approve/:department").get(teacherController.getNewTeachers);

// Route for specific teacher operations (get, approve, delete)
router
  .route("/:id")
  .get(teacherController.getTeacher)
  .patch(teacherController.approveTeacher)
  .delete(teacherController.deleteTeacher);

// New route for editing teacher details
router.route("/edit/:id").patch(teacherController.editTeacher);

module.exports = router;
