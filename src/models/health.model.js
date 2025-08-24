const mongoose = require('mongoose');

// Schema for data fields in tests
const DataFieldSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['number', 'text', 'dropdown', 'boolean', 'time']
  },
  unit: {
    type: String,
    required: false
  },
  required: {
    type: Boolean,
    default: false
  },
  min: {
    type: Number,
    required: false
  },
  max: {
    type: Number,
    required: false
  },
  options: [{
    type: String
  }]
}, { _id: false });

// Schema for calculations in tests
const CalculationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  formula: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  dependsOn: [{
    type: String,
    required: true
  }]
}, { _id: false });

// Schema for individual tests
const TestSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'body_composition',
      'aerobic_endurance',
      'strength_endurance',
      'flexibility',
      'balance'
    ]
  },
  estimatedDuration: {
    type: Number,
    required: true,
    min: 1
  },
  equipmentRequired: [{
    type: String,
    required: true
  }],
  instructions: {
    type: String,
    required: true
  },
  hasMedia: {
    type: Boolean,
    default: false
  },
  hasTimer: {
    type: Boolean,
    default: false
  },
  hasAudio: {
    type: Boolean,
    default: false
  },
  dataFields: [DataFieldSchema],
  calculations: [CalculationSchema]
}, { _id: false });

// Schema for sub-modules
const SubModuleSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tests: [TestSchema]
}, { _id: false });

// Main schema for health-related fitness module
const HealthRelatedFitnessSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  subModules: [SubModuleSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  version: {
    type: String,
    default: '1.0.0'
  }
});

// Pre-save middleware to update the updatedAt field
HealthRelatedFitnessSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for total number of tests across all sub-modules
HealthRelatedFitnessSchema.virtual('totalTests').get(function() {
  return this.subModules.reduce((total, subModule) => {
    return total + subModule.tests.length;
  }, 0);
});

// Virtual for estimated total duration
HealthRelatedFitnessSchema.virtual('totalEstimatedDuration').get(function() {
  return this.subModules.reduce((total, subModule) => {
    return total + subModule.tests.reduce((subTotal, test) => {
      return subTotal + test.estimatedDuration;
    }, 0);
  }, 0);
});

// Instance method to get tests by category
HealthRelatedFitnessSchema.methods.getTestsByCategory = function(category) {
  const tests = [];
  this.subModules.forEach(subModule => {
    subModule.tests.forEach(test => {
      if (test.category === category) {
        tests.push({
          ...test.toObject(),
          subModuleName: subModule.name,
          subModuleId: subModule.id
        });
      }
    });
  });
  return tests;
};

// Instance method to get test by ID
HealthRelatedFitnessSchema.methods.getTestById = function(testId) {
  for (const subModule of this.subModules) {
    const test = subModule.tests.find(test => test.id === testId);
    if (test) {
      return {
        ...test.toObject(),
        subModuleName: subModule.name,
        subModuleId: subModule.id
      };
    }
  }
  return null;
};

// Static method to get all available categories
HealthRelatedFitnessSchema.statics.getAvailableCategories = function() {
  return [
    'body_composition',
    'aerobic_endurance',
    'strength_endurance',
    'flexibility',
    'balance'
  ];
};

// Index for better query performance
HealthRelatedFitnessSchema.index({ 'subModules.tests.id': 1 });
HealthRelatedFitnessSchema.index({ 'subModules.tests.category': 1 });
HealthRelatedFitnessSchema.index({ id: 1, isActive: 1 });

// Ensure virtual fields are serialized
HealthRelatedFitnessSchema.set('toJSON', { virtuals: true });
HealthRelatedFitnessSchema.set('toObject', { virtuals: true });

// Create and export the model
const HealthRelatedFitness = mongoose.model('HealthRelatedFitness', HealthRelatedFitnessSchema);

module.exports = {
  HealthRelatedFitness,
  HealthRelatedFitnessSchema,
  SubModuleSchema,
  TestSchema,
  DataFieldSchema,
  CalculationSchema
};