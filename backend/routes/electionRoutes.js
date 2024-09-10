const express = require('express');
const router = express.Router();
const { createElection, getElections, getElectionById, updateElection, deleteElection } = require('../controllers/electionController');
const auth = require('../middleware/auth');

router.route('/')
  .post(auth, createElection)   // Ensure that createElection is properly referenced
  .get(auth, getElections);

router.route('/:id')
  .get(auth, getElectionById)
  .put(auth, updateElection)
  .delete(auth, deleteElection);

module.exports = router;
