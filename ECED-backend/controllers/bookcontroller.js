const Book = require("./../models/book"); // Adjust path as needed
const asyncHandler = require("express-async-handler");

// Get all books for a specific teacher
const getBooksByTeacher = asyncHandler(async (req, res) => {
  if (!req.params.teacherId) {
    return res.status(400).json({ message: "Teacher ID Missing" });
  }
  
  // Modify the query if you need to fetch books related to a specific teacher.
  // As there's no teacher reference in the book schema, you may need to adapt this logic.
  const books = await Book.find({}).exec();

  if (!books || books.length === 0) {
    return res.status(404).json({ message: "No Books found" });
  }

  res.json(books);
});

// Get all books
const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({}).exec();

  if (!books || books.length === 0) {
    return res.status(404).json({ message: "No Books found" });
  }

  res.json(books);
});

// Get a single book by ID
const getBook = asyncHandler(async (req, res) => {
  if (!req.params.bookId) {
    return res.status(400).json({ message: "Incomplete Request: Params Missing" });
  }

  const book = await Book.findById(req.params.bookId).exec();

  if (!book) {
    return res.status(404).json({ message: "No Book found" });
  }

  res.json(book);
});

// Add a new book
const addBook = asyncHandler(async (req, res) => {
  const {
    titleOfBook,
    titleOfChapters,
    withUGStudents,
    withPGStudents,
    withPhDStudents,
    withFaculty,
    studentNames,
    facultyNames,
    yearOfPublication,
    issnOrIsbnNumber,
    sameAffiliatingInstitution,
    publisherName,
    sourceWebsiteLink,
    doi,
    proof,
  } = req.body;

  // Confirm Data
  if (
    !titleOfBook ||
    !yearOfPublication ||
    !sameAffiliatingInstitution ||
    !publisherName ||
    !proof
  ) {
    return res.status(400).json({ message: "Incomplete Request: Fields Missing" });
  }

  // Check for Duplicates
  const duplicate = await Book.findOne({
    titleOfBook,
    yearOfPublication,
    publisherName,
  }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Book already exists" });
  }

  const bookObj = {
    titleOfBook,
    titleOfChapters,
    withUGStudents,
    withPGStudents,
    withPhDStudents,
    withFaculty,
    studentNames,
    facultyNames,
    yearOfPublication,
    issnOrIsbnNumber,
    sameAffiliatingInstitution,
    publisherName,
    sourceWebsiteLink,
    doi,
    proof,
  };

  // Create and Store New Book
  const record = await Book.create(bookObj);

  if (record) {
    res.status(201).json({ message: `New Book "${titleOfBook}" added` });
  } else {
    res.status(400).json({ message: "Invalid data received" });
  }
});

// Delete a book
const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Book ID required" });
  }

  const record = await Book.findById(id).exec();

  if (!record) {
    return res.status(404).json({ message: "Book not found" });
  }

  await record.deleteOne();

  res.json({ message: `Book "${record.titleOfBook}" deleted` });
});

module.exports = {
  addBook,
  getAllBooks,
  getBooksByTeacher,
  getBook,
  deleteBook,
};
