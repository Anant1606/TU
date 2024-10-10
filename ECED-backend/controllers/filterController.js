const resPaper = require('../models/reserchpaper');
const Patent = require('../models/Patent');
const Fellowship = require('../models/fellowship');
const Teacher = require('../models/Teacher'); // Assuming this is the user model
const Econtent = require('../models/Econtent');
const Journal = require('../models/Journal');
const Consultancy = require('../models/Consultancy'); // Assuming the schema name is "Consultancy"

const filterUsers = async (req, res) => {
  try {
    // Get filter criteria from request query parameters
    const { department, year, paper, awardingAgency, combinedFilters } = req.query;

    // Build individual filter criteria dynamically
    const paperCriteria = {};
    const fellowshipCriteria = {};
    const journalCriteria = {};
    const consultancyCriteria = {};

    if (department) paperCriteria.department = department;
    if (year) paperCriteria.year = year;
    if (paper) paperCriteria.paper = paper;
    if (awardingAgency) fellowshipCriteria.awardingAgency = awardingAgency;

    let users = [];

    // Check if combined filters are required
    if (combinedFilters === 'true') {
      // Fetch teachers who match both criteria in multiple schemas
      const resPapers = await resPaper.find(paperCriteria).select('teacher');
      const fellowships = await Fellowship.find(fellowshipCriteria).select('teacher');
      const journals = await Journal.find(journalCriteria).select('teacher');
      const consultancies = await Consultancy.find(consultancyCriteria).select('teacher');

      // Extract teacher IDs from all sets
      const paperTeacherIds = resPapers.map(p => p.teacher.toString());
      const fellowshipTeacherIds = fellowships.map(f => f.teacher.toString());
      const journalTeacherIds = journals.map(j => j.teacher.toString());
      const consultancyTeacherIds = consultancies.map(c => c.teacher.toString());

      // Find common teachers who match all criteria
      let commonTeacherIds = paperTeacherIds;

      if (fellowshipTeacherIds.length) {
        commonTeacherIds = commonTeacherIds.filter(id => fellowshipTeacherIds.includes(id));
      }
      if (journalTeacherIds.length) {
        commonTeacherIds = commonTeacherIds.filter(id => journalTeacherIds.includes(id));
      }
      if (consultancyTeacherIds.length) {
        commonTeacherIds = commonTeacherIds.filter(id => consultancyTeacherIds.includes(id));
      }

      // Fetch teacher details
      users = await Teacher.find({ _id: { $in: commonTeacherIds } });
    } else {
      // Fetch teachers based on individual filters (resPaper, Fellowship, Journal, Consultancy)
      const paperTeachers = await resPaper.find(paperCriteria).populate('teacher');
      const fellowshipTeachers = await Fellowship.find(fellowshipCriteria).populate('teacher');
      const journalTeachers = await Journal.find(journalCriteria).populate('teacher');
      const consultancyTeachers = await Consultancy.find(consultancyCriteria).populate('teacher');

      // Combine and deduplicate the teacher results
      const paperTeacherSet = new Set(paperTeachers.map(p => p.teacher._id.toString()));
      const fellowshipTeacherSet = new Set(fellowshipTeachers.map(f => f.teacher._id.toString()));
      const journalTeacherSet = new Set(journalTeachers.map(j => j.teacher._id.toString()));
      const consultancyTeacherSet = new Set(consultancyTeachers.map(c => c.teacher._id.toString()));

      const allTeacherIds = [...new Set([...paperTeacherSet, ...fellowshipTeacherSet, ...journalTeacherSet, ...consultancyTeacherSet])];

      // Fetch teacher details
      users = await Teacher.find({ _id: { $in: allTeacherIds } });
    }

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error filtering users', error });
  }
};

module.exports = { filterUsers };
