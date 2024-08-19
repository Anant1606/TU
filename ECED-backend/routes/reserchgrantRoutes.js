const express = require('express');
const router = express.Router();
const {
    addProject,
    getAllProjects,
    getResearchProjects,
    getProject,
    deleteProject,
} = require('../controllers/reserchgrantcontroller'); // Adjust the path to your controller file

// Route for adding a research project
router.post('/research-project', addProject);

// Route for getting all research projects
router.get('/research-project', getAllProjects);

// Route for getting research projects for a specific teacher
router.get('/research-project/teacher/:teacherId', getResearchProjects);

// Route for getting a specific research project
router.get('/research-project/:projectId', getProject);

// Route for deleting a research project
router.delete('/research-project/:projectId', deleteProject);

module.exports = router;
