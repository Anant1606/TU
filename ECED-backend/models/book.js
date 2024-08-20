const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    titleOfBook: {
      type: String, // Title of the book published
      required: true,
    },
    titleOfChapters: {
      type: [String], // Titles of the chapters published
    },
    withUGStudents: {
      type: Boolean, // If the book is with UG students
      default: false,
    },
    withPGStudents: {
      type: Boolean, // If the book is with PG students
      default: false,
    },
    withPhDStudents: {
      type: Boolean, // If the book is with PhD students
      default: false,
    },
    withFaculty: {
      type: Boolean, // If the book is with Faculty
      default: false,
    },
    studentNames: {
      type: [String], // Names of the students involved
    },
    facultyNames: {
      type: [String], // Names of the faculty members involved
    },
    yearOfPublication: {
      type: Number, // Year of publication
      required: true,
    },
    issnOrIsbnNumber: {
      type: String, // ISSN/ISBN number
    },
    sameAffiliatingInstitution: {
      type: String, // Whether at the time of publication Affiliating Institution was the same (Yes/No)
      enum: ["Yes", "No"],
      required: true,
    },
    publisherName: {
      type: String, // Name of the publisher
      required: true,
    },
    sourceWebsiteLink: {
      type: String, // Link to the source website
    },
    doi: {
      type: String, // DOI
    },
    proof: {
      type: String, // Proof (PDF of First page of Publication)
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
