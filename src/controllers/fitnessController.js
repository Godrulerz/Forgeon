const { HealthRelatedFitness } = require('../models');

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

module.exports = {
  getAllModules,
  getModuleById,
  getTestsByCategory,
  getTestById,
  getAvailableCategories
};