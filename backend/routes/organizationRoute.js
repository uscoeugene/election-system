const express = require('express');
const router = express.Router();
const Organization = require('../models/Organization');
const auth = require('../middleware/auth');
const { checkRole } = require('../middleware/rolePermissionCheck');

// Create Organization
router.post('/',
  auth,
  checkRole('Admin'),
  async (req, res) => {
    const { name, description } = req.body;
    try {
      const newOrganization = new Organization({
        name,
        description,
        createdBy: req.user._id
      });
      await newOrganization.save();
      res.status(201).json(newOrganization);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Other CRUD routes (GET, PUT, DELETE) would follow a similar pattern

module.exports = router;
