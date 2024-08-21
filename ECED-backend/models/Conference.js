const mongoose = require('mongoose');

// Define the schema for the ConferencePublication
const conferencePublicationSchema = new mongoose.Schema({
  nameOfConference: {
    type: String,
    required: true,
  },
  titleOfArticle: {
    type: String,
    required: true,
  },
  withUGStudents: {
    type: Boolean, // Whether UG students were involved
    required: true,
  },
  withPGStudents: {
    type: Boolean, // Whether PG students were involved
    required: true,
  },
  withPhDStudents: {
    type: Boolean, // Whether PhD students were involved
    required: true,
  },
  withFaculty: {
    type: Boolean, // Whether faculty were involved
    required: true,
  },
  nameOfStudents: {
    type: [String], // Array of student names
    default: [],
  },
  nameOfFaculty: {
    type: [String], // Array of faculty names
    default: [],
  },
  yearOfPublication: {
    type: Number,
    required: true,
  },
  issnIsbnNumber: {
    type: String,
    required: true,
  },
  sameAffiliatingInstitution: {
    type: Boolean, // Whether the affiliating institution was the same at the time of publication
    required: true,
  },
  nameOfPublisher: {
    type: String,
    required: true,
  },
  sourceLink: {
    type: String, // Link to the source website
    required: true,
  },
  doi: {
    type: String, // DOI of the publication
  },
  proof: {
    type: String, // Link to the PDF of the first page of the publication
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher', // Reference to the Teacher model
    required: true,
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create and export the model
const ConferencePublication = mongoose.model('ConferencePublication', conferencePublicationSchema);

module.exports = ConferencePublication;
