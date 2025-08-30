const mongoose = require('mongoose');

// ============================================================================
// NEUROMUSCULAR READINESS MODELS
// ============================================================================

const dailyReadinessSchema = new mongoose.Schema({
  athleteId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  scores: {
    sleepQuality: { type: Number, min: 1, max: 5, required: true },
    fatigue: { type: Number, min: 1, max: 5, required: true },
    muscleSoreness: { type: Number, min: 1, max: 5, required: true },
    stressLevels: { type: Number, min: 1, max: 5, required: true },
    mood: { type: Number, min: 1, max: 5, required: true }
  },
  totalScore: { type: Number, required: true },
  maxScore: { type: Number, default: 25 },
  readinessPercentage: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['High Readiness', 'Moderate Readiness', 'Low Readiness'],
    required: true 
  },
  notes: { type: String },
  coachId: { type: String }
}, { timestamps: true });

// ============================================================================
// FUNCTIONAL FITNESS SIMULATION MODELS
// ============================================================================

const obstacleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  time: { type: Number, required: true }, // completion time in seconds
  penalties: { type: Number, default: 0 },
  penaltyTime: { type: Number, default: 5 }, // seconds per penalty
  adjustedTime: { type: Number, required: true },
  notes: { type: String }
}, { _id: false });

const customObstacleCircuitSchema = new mongoose.Schema({
  athleteId: { type: String, required: true },
  testName: { type: String, required: true },
  date: { type: Date, default: Date.now },
  obstacles: [obstacleSchema],
  totalRawTime: { type: Number, required: true },
  totalPenaltyTime: { type: Number, required: true },
  finalAdjustedTime: { type: Number, required: true },
  cutoffTime: { type: Number },
  status: { type: String, enum: ['PASS', 'FAIL'], required: true },
  performance: {
    rating: { type: String, enum: ['excellent', 'good', 'average', 'below_average', 'poor'] },
    percentile: { type: Number, min: 0, max: 100 },
    trend: { type: String, enum: ['improving', 'declining', 'stable'] }
  },
  notes: { type: String },
  coachId: { type: String }
}, { timestamps: true });

const ioctSchema = new mongoose.Schema({
  athleteId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  completionTime: { type: Number, required: true }, // in seconds
  penalties: { type: Number, default: 0 },
  totalTime: { type: Number, required: true }, // including penalties
  performance: {
    rating: { type: String, enum: ['excellent', 'good', 'average', 'below_average', 'poor'] },
    percentile: { type: Number, min: 0, max: 100 },
    trend: { type: String, enum: ['improving', 'declining', 'stable'] }
  },
  notes: { type: String },
  coachId: { type: String }
}, { timestamps: true });

// ============================================================================
// REACTION, COORDINATION & REFLEX MODELS
// ============================================================================

const reactionTrialSchema = new mongoose.Schema({
  trial: { type: Number, required: true },
  reactionTime: { type: Number, required: true }, // in milliseconds
  stimulusType: { type: String, enum: ['light', 'sound', 'tactile'], required: true },
  accuracy: { type: Boolean, default: true },
  timestamp: { type: Date, default: Date.now }
}, { _id: false });

const simpleReactionTimeSchema = new mongoose.Schema({
  athleteId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  lightTrials: [reactionTrialSchema],
  soundTrials: [reactionTrialSchema],
  combinedTrials: [reactionTrialSchema],
  metrics: {
    lightAvgTime: { type: Number },
    lightBestTime: { type: Number },
    lightConsistency: { type: Number }, // standard deviation
    soundAvgTime: { type: Number },
    soundBestTime: { type: Number },
    soundConsistency: { type: Number },
    combinedAvgTime: { type: Number },
    combinedBestTime: { type: Number },
    combinedConsistency: { type: Number }
  },
  performance: {
    rating: { type: String, enum: ['excellent', 'good', 'average', 'below_average', 'poor'] },
    percentile: { type: Number, min: 0, max: 100 },
    trend: { type: String, enum: ['improving', 'declining', 'stable'] }
  },
  notes: { type: String },
  coachId: { type: String }
}, { timestamps: true });

const vestibuloOcularReflexSchema = new mongoose.Schema({
  athleteId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  headVelocity: { type: Number, required: true }, // degrees/second
  eyeVelocity: { type: Number, required: true }, // degrees/second
  gain: { type: Number, required: true }, // eye velocity / head velocity
  asymmetry: { type: Number }, // percentage
  performance: {
    rating: { type: String, enum: ['excellent', 'good', 'average', 'below_average', 'poor'] },
    percentile: { type: Number, min: 0, max: 100 },
    trend: { type: String, enum: ['improving', 'declining', 'stable'] }
  },
  notes: { type: String },
  coachId: { type: String }
}, { timestamps: true });

const hReflexSchema = new mongoose.Schema({
  athleteId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  hReflexAmplitude: { type: Number, required: true }, // mV
  mWaveAmplitude: { type: Number, required: true }, // mV
  hMax: { type: Number, required: true }, // maximum H-reflex amplitude
  hMaxRatio: { type: Number, required: true }, // Hmax/Mmax ratio
  performance: {
    rating: { type: String, enum: ['excellent', 'good', 'average', 'below_average', 'poor'] },
    percentile: { type: Number, min: 0, max: 100 },
    trend: { type: String, enum: ['improving', 'declining', 'stable'] }
  },
  notes: { type: String },
  coachId: { type: String }
}, { timestamps: true });

const dtrSchema = new mongoose.Schema({
  athleteId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  reflexes: [{
    name: { type: String, required: true }, // e.g., "Patellar", "Achilles"
    score: { type: Number, min: 0, max: 4, required: true }, // 0=absent, 4=hyperactive
    side: { type: String, enum: ['left', 'right', 'bilateral'], required: true }
  }],
  totalScore: { type: Number, required: true },
  performance: {
    rating: { type: String, enum: ['excellent', 'good', 'average', 'below_average', 'poor'] },
    percentile: { type: Number, min: 0, max: 100 },
    trend: { type: String, enum: ['improving', 'declining', 'stable'] }
  },
  notes: { type: String },
  coachId: { type: String }
}, { timestamps: true });

// ============================================================================
// SPEED, ACCELERATION & AGILITY MODELS
// ============================================================================

const maxRunupSpeedSchema = new mongoose.Schema({
  athleteId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  distance: { type: Number, required: true }, // in meters
  time: { type: Number, required: true }, // in seconds
  speed: { type: Number, required: true }, // m/s
  performance: {
    rating: { type: String, enum: ['excellent', 'good', 'average', 'below_average', 'poor'] },
    percentile: { type: Number, min: 0, max: 100 },
    trend: { type: String, enum: ['improving', 'declining', 'stable'] }
  },
  notes: { type: String },
  coachId: { type: String }
}, { timestamps: true });

const yoYoIRSchema = new mongoose.Schema({
  athleteId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  level: { type: Number, required: true },
  shuttles: { type: Number, required: true },
  totalDistance: { type: Number, required: true }, // in meters
  vo2Max: { type: Number }, // estimated VO2 max
  performance: {
    rating: { type: String, enum: ['excellent', 'good', 'average', 'below_average', 'poor'] },
    percentile: { type: Number, min: 0, max: 100 },
    trend: { type: String, enum: ['improving', 'declining', 'stable'] }
  },
  notes: { type: String },
  coachId: { type: String }
}, { timestamps: true });

const illinoisAgilityTestSchema = new mongoose.Schema({
  athleteId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  completionTime: { type: Number, required: true }, // in seconds
  gender: { type: String, enum: ['male', 'female'], required: true },
  performance: {
    rating: { type: String, enum: ['excellent', 'good', 'average', 'below_average', 'poor'] },
    percentile: { type: Number, min: 0, max: 100 },
    trend: { type: String, enum: ['improving', 'declining', 'stable'] }
  },
  notes: { type: String },
  coachId: { type: String }
}, { timestamps: true });

const agility505Schema = new mongoose.Schema({
  athleteId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  completionTime: { type: Number, required: true }, // in seconds
  direction: { type: String, enum: ['left', 'right'], required: true },
  performance: {
    rating: { type: String, enum: ['excellent', 'good', 'average', 'below_average', 'poor'] },
    percentile: { type: Number, min: 0, max: 100 },
    trend: { type: String, enum: ['improving', 'declining', 'stable'] }
  },
  notes: { type: String },
  coachId: { type: String }
}, { timestamps: true });

const tTestSchema = new mongoose.Schema({
  athleteId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  completionTime: { type: Number, required: true }, // in seconds
  performance: {
    rating: { type: String, enum: ['excellent', 'good', 'average', 'below_average', 'poor'] },
    percentile: { type: Number, min: 0, max: 100 },
    trend: { type: String, enum: ['improving', 'declining', 'stable'] }
  },
  notes: { type: String },
  coachId: { type: String }
}, { timestamps: true });

const timingGatesSchema = new mongoose.Schema({
  athleteId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  distances: [{
    gate: { type: String, required: true }, // e.g., "10m", "20m", "30m"
    time: { type: Number, required: true }, // in seconds
    split: { type: Number } // split time between gates
  }],
  totalTime: { type: Number, required: true },
  performance: {
    rating: { type: String, enum: ['excellent', 'good', 'average', 'below_average', 'poor'] },
    percentile: { type: Number, min: 0, max: 100 },
    trend: { type: String, enum: ['improving', 'declining', 'stable'] }
  },
  notes: { type: String },
  coachId: { type: String }
}, { timestamps: true });

// ============================================================================
// ANAEROBIC & POWER MODELS
// ============================================================================

const verticalJumpSchema = new mongoose.Schema({
  athleteId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  jumpHeight: { type: Number, required: true }, // in cm
  takeoffVelocity: { type: Number }, // m/s
  power: { type: Number }, // watts
  relativePower: { type: Number }, // watts/kg
  performance: {
    rating: { type: String, enum: ['excellent', 'good', 'average', 'below_average', 'poor'] },
    percentile: { type: Number, min: 0, max: 100 },
    trend: { type: String, enum: ['improving', 'declining', 'stable'] }
  },
  notes: { type: String },
  coachId: { type: String }
}, { timestamps: true });

const broadJumpSchema = new mongoose.Schema({
  athleteId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  jumpDistance: { type: Number, required: true }, // in cm
  takeoffVelocity: { type: Number }, // m/s
  power: { type: Number }, // watts
  relativePower: { type: Number }, // watts/kg
  performance: {
    rating: { type: String, enum: ['excellent', 'good', 'average', 'below_average', 'poor'] },
    percentile: { type: Number, min: 0, max: 100 },
    trend: { type: String, enum: ['improving', 'declining', 'stable'] }
  },
  notes: { type: String },
  coachId: { type: String }
}, { timestamps: true });

const timeToPeakForceSchema = new mongoose.Schema({
  athleteId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  timeToPeak: { type: Number, required: true }, // in milliseconds
  peakForce: { type: Number, required: true }, // in Newtons
  rateOfForceDevelopment: { type: Number }, // N/s
  performance: {
    rating: { type: String, enum: ['excellent', 'good', 'average', 'below_average', 'poor'] },
    percentile: { type: Number, min: 0, max: 100 },
    trend: { type: String, enum: ['improving', 'declining', 'stable'] }
  },
  notes: { type: String },
  coachId: { type: String }
}, { timestamps: true });

const wingateAnaerobicTestSchema = new mongoose.Schema({
  athleteId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  peakPower: { type: Number, required: true }, // watts
  meanPower: { type: Number, required: true }, // watts
  fatigueIndex: { type: Number, required: true }, // percentage
  relativePeakPower: { type: Number }, // watts/kg
  relativeMeanPower: { type: Number }, // watts/kg
  performance: {
    rating: { type: String, enum: ['excellent', 'good', 'average', 'below_average', 'poor'] },
    percentile: { type: Number, min: 0, max: 100 },
    trend: { type: String, enum: ['improving', 'declining', 'stable'] }
  },
  notes: { type: String },
  coachId: { type: String }
}, { timestamps: true });

const flightTestSchema = new mongoose.Schema({
  athleteId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  flightTime: { type: Number, required: true }, // in seconds
  jumpHeight: { type: Number, required: true }, // in cm
  power: { type: Number }, // watts
  relativePower: { type: Number }, // watts/kg
  performance: {
    rating: { type: String, enum: ['excellent', 'good', 'average', 'below_average', 'poor'] },
    percentile: { type: Number, min: 0, max: 100 },
    trend: { type: String, enum: ['improving', 'declining', 'stable'] }
  },
  notes: { type: String },
  coachId: { type: String }
}, { timestamps: true });

// ============================================================================
// COMPREHENSIVE ANALYTICS MODEL
// ============================================================================

const skillPerformanceAnalyticsSchema = new mongoose.Schema({
  athleteId: { type: String, required: true },
  period: { type: String, enum: ['week', 'month', 'quarter', 'year'], default: 'month' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  category: { 
    type: String, 
    enum: [
      'neuromuscular_readiness',
      'functional_fitness',
      'reaction_coordination',
      'speed_agility',
      'anaerobic_power',
      'overall'
    ], 
    required: true 
  },
  metrics: {
    totalTests: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
    improvementRate: { type: Number, default: 0 },
    consistencyScore: { type: Number, default: 0 },
    bestPerformance: { type: Number, default: 0 },
    worstPerformance: { type: Number, default: 0 }
  },
  trends: {
    overallTrend: { type: String, enum: ['improving', 'declining', 'stable'] },
    fastestImproving: { type: String },
    slowestImproving: { type: String },
    consistencyTrend: { type: String, enum: ['improving', 'declining', 'stable'] }
  },
  recommendations: [{
    category: { type: String },
    title: { type: String },
    description: { type: String },
    priority: { type: String, enum: ['high', 'medium', 'low'] },
    actionItems: [{ type: String }]
  }],
  testIds: {
    dailyReadiness: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DailyReadiness' }],
    obstacleCircuits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CustomObstacleCircuit' }],
    reactionTests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SimpleReactionTime' }],
    agilityTests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'IllinoisAgilityTest' }],
    powerTests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VerticalJump' }]
  }
}, { timestamps: true });

// ============================================================================
// INDEXES FOR PERFORMANCE
// ============================================================================

dailyReadinessSchema.index({ athleteId: 1, date: -1 });
customObstacleCircuitSchema.index({ athleteId: 1, date: -1 });
simpleReactionTimeSchema.index({ athleteId: 1, date: -1 });
illinoisAgilityTestSchema.index({ athleteId: 1, date: -1 });
verticalJumpSchema.index({ athleteId: 1, date: -1 });
skillPerformanceAnalyticsSchema.index({ athleteId: 1, category: 1, startDate: 1, endDate: 1 });

// ============================================================================
// PRE-SAVE MIDDLEWARE FOR PERFORMANCE CALCULATIONS
// ============================================================================

dailyReadinessSchema.pre('save', function(next) {
  this.totalScore = Object.values(this.scores).reduce((sum, score) => sum + score, 0);
  this.readinessPercentage = (this.totalScore / this.maxScore) * 100;
  
  if (this.readinessPercentage >= 80) {
    this.status = 'High Readiness';
  } else if (this.readinessPercentage >= 60) {
    this.status = 'Moderate Readiness';
  } else {
    this.status = 'Low Readiness';
  }
  next();
});

customObstacleCircuitSchema.pre('save', function(next) {
  this.totalRawTime = this.obstacles.reduce((sum, obs) => sum + obs.time, 0);
  this.totalPenaltyTime = this.obstacles.reduce((sum, obs) => sum + obs.penaltyTime, 0);
  this.finalAdjustedTime = this.totalRawTime + this.totalPenaltyTime;
  
  if (this.cutoffTime) {
    this.status = this.finalAdjustedTime <= this.cutoffTime ? 'PASS' : 'FAIL';
  }
  next();
});

// ============================================================================
// EXPORT ALL MODELS
// ============================================================================

const DailyReadiness = mongoose.model('DailyReadiness', dailyReadinessSchema);
const CustomObstacleCircuit = mongoose.model('CustomObstacleCircuit', customObstacleCircuitSchema);
const IOCT = mongoose.model('IOCT', ioctSchema);
const SimpleReactionTime = mongoose.model('SimpleReactionTime', simpleReactionTimeSchema);
const VestibuloOcularReflex = mongoose.model('VestibuloOcularReflex', vestibuloOcularReflexSchema);
const HReflex = mongoose.model('HReflex', hReflexSchema);
const DTR = mongoose.model('DTR', dtrSchema);
const MaxRunupSpeed = mongoose.model('MaxRunupSpeed', maxRunupSpeedSchema);
const YoYoIR = mongoose.model('YoYoIR', yoYoIRSchema);
const IllinoisAgilityTest = mongoose.model('IllinoisAgilityTest', illinoisAgilityTestSchema);
const Agility505 = mongoose.model('Agility505', agility505Schema);
const TTest = mongoose.model('TTest', tTestSchema);
const TimingGates = mongoose.model('TimingGates', timingGatesSchema);
const VerticalJump = mongoose.model('VerticalJump', verticalJumpSchema);
const BroadJump = mongoose.model('BroadJump', broadJumpSchema);
const TimeToPeakForce = mongoose.model('TimeToPeakForce', timeToPeakForceSchema);
const WingateAnaerobicTest = mongoose.model('WingateAnaerobicTest', wingateAnaerobicTestSchema);
const FlightTest = mongoose.model('FlightTest', flightTestSchema);
const SkillPerformanceAnalytics = mongoose.model('SkillPerformanceAnalytics', skillPerformanceAnalyticsSchema);

module.exports = {
  // Neuromuscular Readiness
  DailyReadiness,
  
  // Functional Fitness Simulation
  CustomObstacleCircuit,
  IOCT,
  
  // Reaction, Coordination & Reflex
  SimpleReactionTime,
  VestibuloOcularReflex,
  HReflex,
  DTR,
  
  // Speed, Acceleration & Agility
  MaxRunupSpeed,
  YoYoIR,
  IllinoisAgilityTest,
  Agility505,
  TTest,
  TimingGates,
  
  // Anaerobic & Power
  VerticalJump,
  BroadJump,
  TimeToPeakForce,
  WingateAnaerobicTest,
  FlightTest,
  
  // Analytics
  SkillPerformanceAnalytics
};
