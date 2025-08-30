const mongoose = require('mongoose');

const metricDataPointSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  value: { type: Number, required: true },
  change: { type: Number, default: 0 },
  changePercent: { type: Number, default: 0 }
});

const performanceMetricSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  currentValue: { type: Number, required: true },
  previousValue: { type: Number },
  change: { type: Number, default: 0 },
  changePercent: { type: Number, default: 0 },
  trend: { type: String, enum: ['up', 'down', 'stable'], default: 'stable' },
  unit: { type: String },
  dataPoints: [metricDataPointSchema],
  target: { type: Number },
  status: { type: String, enum: ['excellent', 'good', 'average', 'below_average', 'poor'] }
});

const assessmentResultSchema = new mongoose.Schema({
  id: { type: String, required: true },
  testName: { type: String, required: true },
  category: { type: String, required: true },
  result: { type: Number, required: true },
  unit: { type: String },
  percentile: { type: Number, min: 0, max: 100 },
  date: { type: Date, required: true },
  status: { type: String, enum: ['completed', 'in_progress', 'scheduled', 'cancelled'] },
  notes: { type: String }
});

const analyticsSchema = new mongoose.Schema({
  athleteId: { type: String, required: true },
  period: { type: String, enum: ['week', 'month', 'quarter', 'year'], default: 'month' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  performanceMetrics: [performanceMetricSchema],
  assessmentResults: [assessmentResultSchema],
  summary: {
    totalAssessments: { type: Number, default: 0 },
    completedAssessments: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
    improvementRate: { type: Number, default: 0 },
    topPerformances: [{ type: String }],
    areasForImprovement: [{ type: String }]
  },
  trends: {
    overallTrend: { type: String, enum: ['improving', 'declining', 'stable'] },
    fastestImproving: { type: String },
    slowestImproving: { type: String },
    consistencyScore: { type: Number, min: 0, max: 100 }
  },
  recommendations: [{
    category: { type: String },
    title: { type: String },
    description: { type: String },
    priority: { type: String, enum: ['high', 'medium', 'low'] },
    actionItems: [{ type: String }]
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
analyticsSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Index for efficient queries
analyticsSchema.index({ athleteId: 1, startDate: 1, endDate: 1 });

module.exports = mongoose.model('Analytics', analyticsSchema);
