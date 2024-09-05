const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote');
const auth = require('../middleware/auth');
const { checkRole } = require('../middleware/rolePermissionCheck');

// Vote route
router.post('/vote',
  auth,
  checkRole('Voter'), // Ensure only voters can access this route
  async (req, res) => {
    const { electionId, positionId, candidateId } = req.body;

    try {
      // Check if the user has already voted for this position in this election
      const existingVote = await Vote.findOne({ electionId, positionId, voterId: req.user._id });
      if (existingVote) {
        return res.status(400).json({ message: 'You have already voted for this position' });
      }

      // Create a new vote
      const newVote = new Vote({
        electionId,
        positionId,
        candidateId,
        voterId: req.user._id,
        createdBy: req.user._id
      });

      await newVote.save();
      res.status(201).json(newVote);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
