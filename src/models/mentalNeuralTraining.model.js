const mongoose = require('mongoose');

// Drill Result Schema for individual trial results
const drillResultSchema = new mongoose.Schema({
  trial: { type: Number, required: true },
  reactionTime: { type: Number, required: true }, // in milliseconds
  accuracy: { type: Boolean, default: true },
  timestamp: { type: Date, default: Date.now },
  stimulusType: { type: String, enum: ['visual', 'auditory', 'tactile'], default: 'visual' },
  responseType: { type: String, enum: ['correct', 'incorrect', 'missed'], default: 'correct' },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  notes: { type: String }
}, { _id: false });

// Drill Configuration Schema
const drillConfigSchema = new mongoose.Schema({
  duration: { type: Number, default: 300 }, // in seconds
  trials: { type: Number, default: 10 },
  restBetweenTrials: { type: Number, default: 3 }, // in seconds
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'intermediate' },
  audioEnabled: { type: Boolean, default: true },
  visualCues: { type: Boolean, default: true },
  stimulusDelay: { type: Number, default: 2000 }, // in milliseconds
  responseTimeout: { type: Number, default: 2000 }, // in milliseconds
  targetAccuracy: { type: Number, default: 80 }, // percentage
  targetReactionTime: { type: Number, default: 500 } // in milliseconds
}, { _id: false });

// Enhanced Drill Schema
const drillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['reaction', 'focus', 'coordination', 'memory', 'dual_task', 'attention', 'processing_speed'], 
    required: true 
  },
  description: { type: String },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  estimatedDuration: { type: Number, default: 300 }, // in seconds
  equipmentRequired: [{ type: String }],
  instructions: { type: String },
  config: { type: drillConfigSchema, default: () => ({}) },
  parameters: { type: mongoose.Schema.Types.Mixed, default: {} },
  createdBy: { type: String },
  isActive: { type: Boolean, default: true },
  tags: [{ type: String }],
  normativeData: {
    beginner: {
      avgReactionTime: { type: Number, default: 600 },
      accuracy: { type: Number, default: 70 },
      completionTime: { type: Number, default: 300 }
    },
    intermediate: {
      avgReactionTime: { type: Number, default: 450 },
      accuracy: { type: Number, default: 80 },
      completionTime: { type: Number, default: 250 }
    },
    advanced: {
      avgReactionTime: { type: Number, default: 350 },
      accuracy: { type: Number, default: 90 },
      completionTime: { type: Number, default: 200 }
    }
  }
}, { timestamps: true });

// Enhanced Session Schema
const sessionSchema = new mongoose.Schema({
  athleteId: { type: String, required: true },
  drillId: { type: mongoose.Schema.Types.ObjectId, ref: 'MN_Drill', required: true },
  coachId: { type: String },
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date },
  settings: { type: drillConfigSchema, default: () => ({}) },
  results: [drillResultSchema],
  metrics: {
    avgReactionTime: { type: Number },
    bestReactionTime: { type: Number },
    worstReactionTime: { type: Number },
    accuracy: { type: Number }, // percentage
    successRate: { type: Number }, // percentage
    trialsCompleted: { type: Number, default: 0 },
    totalTrials: { type: Number, default: 0 },
    completionTime: { type: Number }, // in seconds
    score: { type: Number },
    consistencyScore: { type: Number }, // 0-100
    improvementRate: { type: Number } // percentage improvement from baseline
  },
  performance: {
    percentile: { type: Number, min: 0, max: 100 },
    rating: { 
      type: String, 
      enum: ['excellent', 'good', 'average', 'below_average', 'poor'],
      default: 'average'
    },
    trend: { 
      type: String, 
      enum: ['improving', 'declining', 'stable'],
      default: 'stable'
    }
  },
  notes: { type: String },
  status: { 
    type: String, 
    enum: ['scheduled', 'in_progress', 'completed', 'cancelled', 'paused'], 
    default: 'completed' 
  },
  baselineComparison: {
    previousSessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'MN_Session' },
    improvement: { type: Number }, // percentage
    trend: { type: String, enum: ['up', 'down', 'stable'] }
  }
}, { timestamps: true });

// Analytics Integration Schema
const mentalNeuralAnalyticsSchema = new mongoose.Schema({
  athleteId: { type: String, required: true },
  period: { type: String, enum: ['week', 'month', 'quarter', 'year'], default: 'month' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  category: { type: String, enum: ['reaction', 'focus', 'coordination', 'memory', 'dual_task', 'overall'], required: true },
  metrics: {
    avgReactionTime: { type: Number },
    bestReactionTime: { type: Number },
    accuracy: { type: Number },
    consistencyScore: { type: Number },
    improvementRate: { type: Number },
    sessionsCompleted: { type: Number, default: 0 },
    totalDrills: { type: Number, default: 0 }
  },
  trends: {
    reactionTime: { type: String, enum: ['improving', 'declining', 'stable'] },
    accuracy: { type: String, enum: ['improving', 'declining', 'stable'] },
    consistency: { type: String, enum: ['improving', 'declining', 'stable'] },
    overallTrend: { type: String, enum: ['improving', 'declining', 'stable'] }
  },
  recommendations: [{
    category: { type: String },
    title: { type: String },
    description: { type: String },
    priority: { type: String, enum: ['high', 'medium', 'low'] },
    actionItems: [{ type: String }]
  }],
  sessionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MN_Session' }]
}, { timestamps: true });

// Indexes for efficient queries
drillSchema.index({ category: 1, difficulty: 1, isActive: 1 });
sessionSchema.index({ athleteId: 1, startedAt: -1 });
sessionSchema.index({ drillId: 1, startedAt: -1 });
sessionSchema.index({ status: 1, startedAt: -1 });
mentalNeuralAnalyticsSchema.index({ athleteId: 1, category: 1, startDate: 1, endDate: 1 });

// Virtual for session duration
sessionSchema.virtual('duration').get(function() {
  if (this.endedAt && this.startedAt) {
    return Math.round((this.endedAt - this.startedAt) / 1000); // in seconds
  }
  return null;
});

// Pre-save middleware to calculate metrics
sessionSchema.pre('save', function(next) {
  if (this.results && this.results.length > 0) {
    const validResults = this.results.filter(r => r.reactionTime < 2000); // Filter out missed responses
    
    if (validResults.length > 0) {
      this.metrics.avgReactionTime = Math.round(
        validResults.reduce((sum, r) => sum + r.reactionTime, 0) / validResults.length
      );
      this.metrics.bestReactionTime = Math.min(...validResults.map(r => r.reactionTime));
      this.metrics.worstReactionTime = Math.max(...validResults.map(r => r.reactionTime));
    }
    
    this.metrics.accuracy = Math.round((validResults.length / this.results.length) * 100);
    this.metrics.successRate = Math.round(
      (this.results.filter(r => r.reactionTime < 500).length / this.results.length) * 100
    );
    this.metrics.trialsCompleted = this.results.length;
    this.metrics.totalTrials = this.results.length;
    
    // Calculate consistency score (lower standard deviation = higher consistency)
    if (validResults.length > 1) {
      const mean = validResults.reduce((sum, r) => sum + r.reactionTime, 0) / validResults.length;
      const variance = validResults.reduce((sum, r) => sum + Math.pow(r.reactionTime - mean, 2), 0) / validResults.length;
      const stdDev = Math.sqrt(variance);
      this.metrics.consistencyScore = Math.max(0, Math.round(100 - (stdDev / 10))); // Normalize to 0-100
    }
    
    // Calculate overall score
    this.metrics.score = Math.round(
      (this.metrics.accuracy * 0.4) + 
      (Math.max(0, 100 - (this.metrics.avgReactionTime / 10)) * 0.4) + 
      (this.metrics.consistencyScore * 0.2)
    );
  }
  
  if (this.endedAt && this.startedAt) {
    this.metrics.completionTime = Math.round((this.endedAt - this.startedAt) / 1000);
  }
  
  next();
});

// Performance rating calculation
sessionSchema.pre('save', function(next) {
  if (this.metrics.score !== undefined) {
    if (this.metrics.score >= 90) this.performance.rating = 'excellent';
    else if (this.metrics.score >= 80) this.performance.rating = 'good';
    else if (this.metrics.score >= 70) this.performance.rating = 'average';
    else if (this.metrics.score >= 60) this.performance.rating = 'below_average';
    else this.performance.rating = 'poor';
  }
  next();
});

const Drill = mongoose.model('MN_Drill', drillSchema);
const Session = mongoose.model('MN_Session', sessionSchema);
const MentalNeuralAnalytics = mongoose.model('MN_Analytics', mentalNeuralAnalyticsSchema);

module.exports = { Drill, Session, MentalNeuralAnalytics };


