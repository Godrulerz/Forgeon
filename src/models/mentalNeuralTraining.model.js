const mongoose = require('mongoose');

const drillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['reaction', 'focus', 'coordination', 'memory', 'dual_task'], required: true },
  description: { type: String },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  parameters: { type: mongoose.Schema.Types.Mixed, default: {} },
  createdBy: { type: String },
}, { timestamps: true });

const sessionSchema = new mongoose.Schema({
  athleteId: { type: String, required: true },
  drillId: { type: mongoose.Schema.Types.ObjectId, ref: 'MN_Drill', required: true },
  coachId: { type: String },
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date },
  settings: { type: mongoose.Schema.Types.Mixed, default: {} },
  metrics: [{ key: String, value: Number, unit: String }],
  score: { type: Number },
  notes: { type: String },
  status: { type: String, enum: ['scheduled', 'in_progress', 'completed', 'cancelled'], default: 'completed' },
}, { timestamps: true });

const Drill = mongoose.model('MN_Drill', drillSchema);
const Session = mongoose.model('MN_Session', sessionSchema);

module.exports = { Drill, Session };


