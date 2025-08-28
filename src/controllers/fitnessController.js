// src/controllers/fitnessController.js
const { HealthRelatedFitness } = require('../models/health.model.js');

const getAllModules = async (req, res) => {
  try {
    const modules = await HealthRelatedFitness.find({ isActive: true });
    res.status(200).json({
      success: true,
      data: modules
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getModuleById = async (req, res) => {
  try {
    const module = await HealthRelatedFitness.findOne({ 
      id: req.params.id, 
      isActive: true 
    });
    
    if (!module) {
      return res.status(404).json({
        success: false,
        error: 'Module not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: module
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getTestsByCategory = async (req, res) => {
  try {
    const module = await HealthRelatedFitness.findOne({ isActive: true });
    
    if (!module) {
      return res.status(404).json({
        success: false,
        error: 'Module not found'
      });
    }
    
    const tests = module.getTestsByCategory(req.params.category);
    
    res.status(200).json({
      success: true,
      data: tests,
      count: tests.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getTestById = async (req, res) => {
  try {
    const module = await HealthRelatedFitness.findOne({ isActive: true });
    
    if (!module) {
      return res.status(404).json({
        success: false,
        error: 'Module not found'
      });
    }
    
    const test = module.getTestById(req.params.testId);
    
    if (!test) {
      return res.status(404).json({
        success: false,
        error: 'Test not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: test
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getAvailableCategories = async (req, res) => {
  try {
    const categories = HealthRelatedFitness.getAvailableCategories();
    
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// POST /api/fitness/health/tests/cooper/evaluate
const evaluateCooperTest = async (req, res) => {
  try {
    const { distance, laps_completed } = req.body || {};
    const numericDistance = Number(distance);
    if (!Number.isFinite(numericDistance) || numericDistance <= 0) {
      return res.status(400).json({ success: false, error: 'Invalid distance (m) provided' });
    }

    const vo2max = (numericDistance - 504.9) / 44.73; // ml/kg/min

    // Simple categorization (male/female norms could be added later)
    let category = 'average';
    if (vo2max >= 55) category = 'excellent';
    else if (vo2max >= 50) category = 'very_good';
    else if (vo2max >= 45) category = 'good';
    else if (vo2max < 35) category = 'poor';

    return res.status(200).json({
      success: true,
      data: {
        input: { distance: numericDistance, laps_completed: laps_completed ? Number(laps_completed) : undefined },
        results: {
          estimated_vo2max: Number(vo2max.toFixed(2)),
          category
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllModules,
  getModuleById,
  getTestsByCategory,
  getTestById,
  getAvailableCategories,
  evaluateCooperTest
};
