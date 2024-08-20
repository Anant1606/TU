const express = require('express');
const router = express.Router();
const {
  addBook,
  getAllBooks,
  getBooksByTeacher,
  getBook,
  deleteBook,
} = require("../controllers/bookcontroller"); // Adjust path as needed

// Route to get all books
router.get('/', getAllBooks);

// Route to get all books for a specific teacher
router.get('/teacher/:teacherId', getBooksByTeacher);

// Route to get a single book by ID
router.get('/:bookId', getBook);

// Route to add a new book
router.post('/', addBook);

// Route to delete a book
router.delete('/', deleteBook);

module.exports = router;
