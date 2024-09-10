// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const logger = require('../config/logger');
const authMiddleware = require('../middleware/auth');
// Get all users
router.get('/', async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users from the database
      logger.info("User route accessed"); // Log access to the route
  
      if (users.length === 0) {
        return res.status(404).json({ message: "No users found" }); // Return 404 if no users are found
      }
  
      res.json(users); // Return the users in JSON format
    } catch (err) {
      logger.error("Error fetching users: " + err.message); // Log the error
      res.status(500).json({ message: err.message }); // Return 500 for server errors
    }
  });
  

  //Get user profile
  router.get('/profile', authMiddleware, async (req, res) => {
    try {
      console.log("user profile route");
      console.log(req);
      const user = await User.findById(req.user.id).select('-password'); // Fetch all users from the database
      logger.info("User route accessed"); // Log access to the route
  
      if (!user) {
        return res.status(404).json({ message: "User not found" }); // Return 404 if no users are found
      }
  
      res.json(user); // Return the users in JSON format
    } catch (err) {
      console.log(err);
      logger.error("Error fetching user profile: " + err.message); // Log the error
      res.status(500).json({ message: err.message }); // Return 500 for server errors
    }
  });
  

// Create a new user
router.post('/', async (req, res) => {
  const { username, fullname, password, email, phone } = req.body;
  try {
    const newUser = new User({ username, fullname, password, email, phone });
    await newUser.save();
    logger.info("New User Added  by: " + fullname);

    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Other routes (Update, Delete, etc.)
module.exports = router;