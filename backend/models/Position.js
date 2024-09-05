const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  electionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Election', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Position', positionSchema);
