const express = require('express');
const router = express.Router();
const Organization = require('../models/Organization');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

// Utility function to combine validation error messages
const getValidationErrors = (errors) => {
  return errors.array().map(err => err.msg).join(', ');
};

// Create a new organization
router.post('/',
  auth,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('contactEmail').isEmail().withMessage('Valid email is required'),
    body('contactPhone').notEmpty().withMessage('Contact phone is required'),
    body('description').optional().isString().withMessage('Description must be a string')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: getValidationErrors(errors) });
    }
    
    const { name, address, contactEmail, contactPhone, description, isActive } = req.body;

    try {
      const newOrganization = new Organization({
        name,
        address,
        contactEmail,
        contactPhone,
        description,
        isActive,
        createdBy: req.user.id
      });

      const organization = await newOrganization.save();
      res.json(organization);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Get all organizations
router.get('/', async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.json(organizations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get an organization by ID
router.get('/:id', async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    res.json(organization);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update an organization
router.put('/:id',
  auth,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('contactEmail').isEmail().withMessage('Valid email is required'),
    body('contactPhone').notEmpty().withMessage('Contact phone is required'),
    body('description').optional().isString().withMessage('Description must be a string')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: getValidationErrors(errors) });
    }

    const { name, address, contactEmail, contactPhone, description, isActive } = req.body;

    try {
      let organization = await Organization.findById(req.params.id);
      if (!organization) {
        return res.status(404).json({ message: 'Organization not found' });
      }

      // Check if user is authorized
      if (organization.createdBy.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      organization = await Organization.findByIdAndUpdate(
        req.params.id,
        { $set: { name, address, contactEmail, contactPhone, description, isActive, updatedBy: req.user.id, updatedAt: Date.now() } },
        { new: true }
      );

      res.json(organization);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Delete an organization
router.delete('/:id',
  auth,
  async (req, res) => {
    try {
      let organization = await Organization.findById(req.params.id);
      if (!organization) {
        return res.status(404).json({ message: 'Organization not found' });
      }

      // Check if user is authorized
      if (organization.createdBy.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      await Organization.findByIdAndDelete(req.params.id);

      res.json({ message: 'Organization Deleted Successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: `Server Error: ${err.message}` });
    }
  }
);

module.exports = router;
