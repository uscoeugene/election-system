const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

const { body, validationResult } = require('express-validator');

// Login route
router.post('/login',
  // Validate and sanitize inputs
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    console.log(req.body);
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      // Find user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check if password matches
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const payload = {
        id: user._id,
        username: user.username
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.post('/signup', async (req, res) => {
  const { username, fullname, password, email, phone } = req.body;

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    // Create a new user if no duplicates are found
    const newUser = new User({ username, fullname, password, email, phone });
    await newUser.save();
    
    

    res.status(201).json(newUser);
  } catch (err) {
    // Handle other errors (e.g., validation errors)
    if (err.code === 11000) {
      // Duplicate key error
      const key = Object.keys(err.keyValue)[0]; // e.g., "username" or "email"
      const value = err.keyValue[key];
      return res.status(400).json({ message: `${key.charAt(0).toUpperCase() + key.slice(1)} '${value}' already exists` });
    }
    logger.info("An error error has occured:  " + err);
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
