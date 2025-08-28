const mongoose = require('mongoose');

const inputSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String },
  value: { type: Number, required: true },
  unit: { type: String }
}, { _id: false });

const calculatedSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String },
  value: { type: Number, required: true },
  unit: { type: String }
}, { _id: false });

const HRFAssessmentSchema = new mongoose.Schema({
  athleteId: { type: String, required: true },
  testId: { type: String, required: true }, // matches TestSchema.id
  testName: { type: String },
  category: { type: String },
  inputs: [inputSchema],
  calculations: [calculatedSchema],
  notes: { type: String },
  performedAt: { type: Date, default: Date.now }
}, { timestamps: true });

HRFAssessmentSchema.index({ athleteId: 1, performedAt: -1 });
HRFAssessmentSchema.index({ testId: 1, performedAt: -1 });

module.exports = mongoose.model('HRFAssessment', HRFAssessmentSchema);


