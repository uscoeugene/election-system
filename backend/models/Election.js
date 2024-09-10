const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  electionName: { type: String, required: true },
  startDateTime: { type: Date, required: true },
  endDateTime: { type: Date, required: true },
  voteMethod: { type: String, enum: ['SMS', 'Email', 'SMSandEmail', 'OneClick'], required: true },
  coverImage: { type: String },
  specialInstructions: { type: String },
  status: { type: String, enum: ['Started', 'Ended', 'Ongoing', 'NotStarted', 'Suspended', 'Cancelled'], required: true },
  electionCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Election = mongoose.model('Election', electionSchema);

module.exports = Election;
