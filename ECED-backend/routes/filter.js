const express = require('express');
const router = express.Router();
const { filterUsers } = require('../controllers/filterController');

// Define the route for filtering users
router.get('/filter-users', filterUsers);

module.exports = router;
