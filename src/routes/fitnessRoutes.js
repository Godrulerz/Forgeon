const express = require('express');
const {
  getAllModules,
  getModuleById,
  getTestsByCategory,
  getTestById,
  getAvailableCategories,
  evaluateCooperTest
} = require('../controllers/fitnessController.js');

const router = express.Router();

// GET /api/fitness/modules - Get all fitness modules
router.get('/modules', getAllModules);

// GET /api/fitness/modules/:id - Get specific module
router.get('/modules/:id', getModuleById);

// GET /api/fitness/categories - Get available categories
router.get('/categories', getAvailableCategories);

// GET /api/fitness/tests/category/:category - Get tests by category
router.get('/tests/category/:category', getTestsByCategory);

// GET /api/fitness/tests/:testId - Get specific test
router.get('/tests/:testId', getTestById);

// Evaluation endpoints
router.post('/health/tests/cooper/evaluate', evaluateCooperTest);

module.exports = router;
