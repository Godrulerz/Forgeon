const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/mentalNeuralTraining.controller');
const validateBody = require('../middlewares/validateBody');
const { pushToAnalytics, generateAnalyticsReport, trackPerformanceMetrics } = require('../middlewares/analyticsMiddleware');

// DRILLS
router.get('/drills', ctrl.listDrills);
router.post('/drills', validateBody(['name', 'category']), ctrl.createDrill);
router.get('/drills/:id', ctrl.getDrill);
router.put('/drills/:id', ctrl.updateDrill);
router.delete('/drills/:id', ctrl.deleteDrill);

// SESSIONS
router.get('/sessions', ctrl.listSessions);
router.post('/sessions', validateBody(['athleteId', 'drillId']), ctrl.createSession);
router.get('/sessions/:id', ctrl.getSession);
router.put('/sessions/:id', ctrl.updateSession);
router.delete('/sessions/:id', ctrl.deleteSession);

// SESSION EXECUTION (with analytics middleware)
router.post('/sessions/:sessionId/start', ctrl.startSession);
router.post('/sessions/:sessionId/complete', 
  validateBody(['results']), 
  trackPerformanceMetrics,
  pushToAnalytics,
  ctrl.completeSession
);

// PYTHON SCRIPT INTEGRATION
router.post('/execute-drill', 
  validateBody(['drillId', 'athleteId']), 
  trackPerformanceMetrics,
  pushToAnalytics,
  ctrl.executeDrill
);

// ANALYTICS
router.get('/analytics/athlete/:athleteId', ctrl.getAthleteAnalytics);
router.post('/analytics/generate', 
  validateBody(['athleteId', 'startDate', 'endDate']), 
  ctrl.generateAnalytics
);
router.get('/analytics/trends/:athleteId', ctrl.getPerformanceTrends);

// COMPREHENSIVE ANALYTICS REPORT
router.get('/analytics/report/:athleteId', 
  generateAnalyticsReport,
  (req, res) => {
    res.json(req.analyticsReport);
  }
);

// DASHBOARD STATISTICS
router.get('/dashboard/:athleteId', ctrl.getDashboardStats);

module.exports = router;


