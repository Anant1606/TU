const { mongoose } = require('mongoose');
const ConferencePublication = require('./../models/Conference'); // Adjust path as needed
const asyncHandler = require('express-async-handler');

// Get conference publications by teacher ID
const getConferencePublicationsByTeacher = asyncHandler(async (req, res) => {
  const teacherId = req.params.teacherId;

  if (!teacherId) {
    return res.status(400).json({ message: 'Teacher ID Missing' });
  }

  const conferencePublications = await ConferencePublication.find({ teacher: teacherId })
    .exec();

  if (!conferencePublications || conferencePublications.length === 0) {
    return res.status(404).json({ message: 'No Conference Publications found' });
  }

  res.json(conferencePublications);
});

// Get all conference publications with teacher details
const getAllConferencePublications = asyncHandler(async (req, res) => {
  const publications = await ConferencePublication.aggregate([
    {
      $lookup: {
        from: 'teachers',
        localField: 'teacher',
        foreignField: '_id',
        as: 'teacher',
      },
    },
    {
      $unwind: '$teacher',
    },
    {
      $project: {
        nameOfConference: 1,
        titleOfArticle: 1,
        withUGStudents: 1,
        withPGStudents: 1,
        withPhDStudents: 1,
        withFaculty: 1,
        nameOfStudents: 1,
        nameOfFaculty: 1,
        yearOfPublication: 1,
        issnIsbnNumber: 1,
        sameAffiliatingInstitution: 1,
        nameOfPublisher: 1,
        sourceLink: 1,
        doi: 1,
        proof: 1,
        'teacher.name': 1,
      },
    },
  ]);

  if (!publications || publications.length === 0) {
    return res.status(404).json({ message: 'No Conference Publications found' });
  }

  res.json(publications);
});

// Get a specific conference publication by ID
const getConferencePublication = asyncHandler(async (req, res) => {
  const publicationId = req.params.publicationId;

  if (!publicationId) {
    return res.status(400).json({ message: 'Incomplete Request: Params Missing' });
  }

  const publication = await ConferencePublication.findOne({ _id: publicationId })
    .populate({ path: 'teacher', select: 'name' })
    .exec();

  if (!publication) {
    return res.status(404).json({ message: 'Conference Publication not found' });
  }

  res.json(publication);
});

// Add a new conference publication
const addConferencePublication = asyncHandler(async (req, res) => {
  const {
    nameOfConference,
    titleOfArticle,
    withUGStudents,
    withPGStudents,
    withPhDStudents,
    withFaculty,
    nameOfStudents,
    nameOfFaculty,
    yearOfPublication,
    issnIsbnNumber,
    sameAffiliatingInstitution,
    nameOfPublisher,
    sourceLink,
    doi,
    proof,
    teacher,
  } = req.body;

  // Confirm Data
  if (
    !nameOfConference ||
    !titleOfArticle ||
    !withUGStudents ||
    !withPGStudents ||
    !withPhDStudents ||
    !withFaculty ||
    !yearOfPublication ||
    !issnIsbnNumber ||
    !sameAffiliatingInstitution ||
    !nameOfPublisher ||
    !sourceLink ||
    !proof ||
    !teacher
  ) {
    return res.status(400).json({ message: 'Incomplete Request: Fields Missing' });
  }

  // Check for Duplicates
  const duplicate = await ConferencePublication.findOne({
    nameOfConference,
    titleOfArticle,
    yearOfPublication,
    teacher,
  }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: 'Conference Publication already exists' });
  }

  const publicationObj = {
    nameOfConference,
    titleOfArticle,
    withUGStudents,
    withPGStudents,
    withPhDStudents,
    withFaculty,
    nameOfStudents,
    nameOfFaculty,
    yearOfPublication,
    issnIsbnNumber,
    sameAffiliatingInstitution,
    nameOfPublisher,
    sourceLink,
    doi,
    proof,
    teacher,
  };

  // Create and Store New Publication
  const record = await ConferencePublication.create(publicationObj);

  if (record) {
    res.status(201).json({ message: `New Conference Publication ${titleOfArticle} added` });
  } else {
    res.status(400).json({ message: 'Invalid data received' });
  }
});

// Delete a conference publication
const deleteConferencePublication = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Publication ID required' });
  }

  const record = await ConferencePublication.findById(id).exec();

  if (!record) {
    return res.status(404).json({ message: 'Conference Publication not found' });
  }

  await record.deleteOne();

  res.json({ message: `${id} deleted` });
});

module.exports = {
  addConferencePublication,
  getAllConferencePublications,
  getConferencePublicationsByTeacher,
  getConferencePublication,
  deleteConferencePublication,
};
