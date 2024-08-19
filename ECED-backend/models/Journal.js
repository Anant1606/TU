const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema(
  {
    title: {
      type: String, // Title of the paper
      required: true,
    },
    authors: {
      type: String, // Name of the author/s
      required: true,
    },
    withUGStudents: {
      type: Boolean, // If the paper is with UG students
      default: false,
    },
    withPGStudents: {
      type: Boolean, // If the paper is with PG students
      default: false,
    },
    withPhDStudents: {
      type: Boolean, // If the paper is with PhD students
      default: false,
    },
    withFaculty: {
      type: Boolean, // If the paper is with Faculty
      default: false,
    },
    studentNames: {
      type: [String], // Names of the students involved
    },
    facultyNames: {
      type: [String], // Names of the faculty members involved
    },
    journalIndexing: {
      type: String, // Journal indexing (e.g., Scopus, SCI, etc.)
    },
    journalName: {
      type: String, // Name of the journal
      required: true,
    },
    yearOfPublication: {
      type: Number, // Year of publication
      required: true,
    },
    issnNumber: {
      type: String, // ISSN number
    },
    journalWebsiteLink: {
      type: String, // Link to the website of the journal
    },
    articleLink: {
      type: String, // Link to the article/paper/abstract
    },
    impactFactor: {
      type: Number, // Impact factor of the journal
    },
    doi: {
      type: String, // DOI of the paper
    },
    proof: {
      type: String, // Link to the PDF of the first page of the publication
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher", // Reference to the Teacher model
      required: true, // Ensure that a paper is always associated with a teacher
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const JournalPaper = mongoose.model("JournalPaper", JournalSchema);

module.exports = JournalPaper;
