const { body, validationResult } = require('express-validator');
const Election = require('../models/Election');
const Organization = require('../models/Organization');
const User = require('../models/User'); // Assuming you have a User model

// Validation middleware
const electionValidationRules = () => [
  body('organizationId').isMongoId().withMessage('Invalid organization ID'),
  body('electionName').isString().withMessage('Election name must be a string').notEmpty().withMessage('Election name is required'),
  body('startDateTime').isISO8601().withMessage('Invalid start date/time'),
  body('endDateTime').isISO8601().withMessage('Invalid end date/time'),
  body('voteMethod').isIn(['SMS', 'Email', 'SMSandEmail', 'OneClick']).withMessage('Invalid vote method'),
  body('status').isIn(['Started', 'Ended', 'Ongoing', 'NotStarted', 'Suspended', 'Cancelled']).withMessage('Invalid status'),
  body('electionCode').isString().withMessage('Election code must be a string').notEmpty().withMessage('Election code is required'),
];

// Combine validation errors into a single string
const getValidationErrors = (errors) => {
  return errors.array().map(err => err.msg).join(', ');
};

// @desc    Create a new election
// @route   POST /api/elections
// @access  Private
const createElection = [
  ...electionValidationRules(),
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(getValidationErrors(errors) );
      return res.status(400).json({ message: getValidationErrors(errors) });
    }

    const { organizationId, electionName, startDateTime, endDateTime, voteMethod, coverImage, specialInstructions, status, electionCode } = req.body;
    const userId = req.user._id; // Assuming you have middleware that sets req.user

    try {
      const election = new Election({
        organizationId,
        electionName,
        startDateTime,
        endDateTime,
        voteMethod,
        coverImage,
        specialInstructions,
        status,
        electionCode,
        createdBy: userId,
        updatedBy: userId
      });

      const createdElection = await election.save();
      res.status(201).json(createdElection);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
];

// @desc    Get all elections
// @route   GET /api/elections
// @access  Public
const getElections = async (req, res) => {
    try {
      const elections = await Election.find()
        .populate({
          path: 'organizationId',
        //  select: 'name', // Include only the organizationName field from the Organization document
        });
  
      // Transform the result to include both organizationId and organizationName in the output
      // const formattedElections = elections.map(election => ({
      //   ...election.toObject(), // Convert Mongoose document to a plain object
      //   organizationId: {
      //     _id: election.organizationId._id,
      //     organizationName: election.organizationId.organizationName
      //   }
      // }));
  
      res.json(elections);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// @desc    Get election by ID
// @route   GET /api/elections/:id
// @access  Public
const getElectionById = async (req, res) => {
  try {
    const election = await Election.findById(req.params.id).populate('organizationId');

    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }

    res.json(election);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an election
// @route   PUT /api/elections/:id
// @access  Private
const updateElection = [
  ...electionValidationRules(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: getValidationErrors(errors) });
    }

    const { organizationId, electionName, startDateTime, endDateTime, voteMethod, coverImage, specialInstructions, status, electionCode } = req.body;
    const userId = req.user._id; // Assuming you have middleware that sets req.user

    try {
      const election = await Election.findById(req.params.id);

      if (!election) {
        return res.status(404).json({ message: 'Election not found' });
      }

      election.organizationId = organizationId || election.organizationId;
      election.electionName = electionName || election.electionName;
      election.startDateTime = startDateTime || election.startDateTime;
      election.endDateTime = endDateTime || election.endDateTime;
      election.voteMethod = voteMethod || election.voteMethod;
      election.coverImage = coverImage || election.coverImage;
      election.specialInstructions = specialInstructions || election.specialInstructions;
      election.status = status || election.status;
      election.electionCode = electionCode || election.electionCode;
      election.updatedBy = userId;

      const updatedElection = await election.save();
      res.json(updatedElection);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

// @desc    Delete an election
// @route   DELETE /api/elections/:id
// @access  Private
const deleteElection = async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);

    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }

    await election.remove();
    res.json({ message: 'Election removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createElection,
  getElections,
  getElectionById,
  updateElection,
  deleteElection
};
