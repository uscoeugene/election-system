const express = require('express');
const router = express.Router();
const VerificationToken = require('../models/VerificationToken');
const Voter = require('../models/Voter');
const { body, validationResult } = require('express-validator');

// Generate Verification Token
router.post('/generate-token',
  async (req, res) => {
    const { voterId } = req.body;

    try {
      const voter = await Voter.findById(voterId);
      if (!voter) {
        return res.status(404).json({ message: 'Voter not found' });
      }

      // Generate token parts (this is a simple example, you should use a more secure method)
      const tokenPart1 = Math.random().toString(36).substr(2);
      const tokenPart2 = Math.random().toString(36).substr(2);

      const newToken = new VerificationToken({
        voterId,
        tokenPart1,
        tokenPart2,
        createdBy: req.user._id
      });

      await newToken.save();
      // Send the token parts via email or SMS to the voter
      // (For now, just send it in the response for testing)
      res.json({ tokenPart1, tokenPart2 });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Verify Token
router.post('/verify-token',
  [
    body('tokenPart1').notEmpty().withMessage('Token part 1 is required'),
    body('tokenPart2').notEmpty().withMessage('Token part 2 is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { tokenPart1, tokenPart2, voterId } = req.body;

    try {
      const token = await VerificationToken.findOne({ voterId, tokenPart1, tokenPart2 });
      if (!token) {
        return res.status(400).json({ message: 'Invalid token' });
      }

      token.isVerified = true;
      await token.save();
      res.json({ message: 'Token verified successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
