const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/skillPerformanceTesting.controller');
const validateBody = require('../middlewares/validateBody');

// ============================================================================
// NEUROMUSCULAR READINESS ROUTES
// ============================================================================

// Daily Readiness Assessment
router.post('/neuromuscular-readiness/daily-readiness', 
  validateBody(['athleteId', 'scores']), 
  ctrl.createDailyReadiness
);

router.get('/neuromuscular-readiness/daily-readiness/:athleteId', 
  ctrl.getDailyReadiness
);

router.post('/neuromuscular-readiness/execute-daily-readiness', 
  validateBody(['athleteId']), 
  ctrl.executeDailyReadiness
);

// ============================================================================
// FUNCTIONAL FITNESS SIMULATION ROUTES
// ============================================================================

// Custom Obstacle Circuit
router.post('/functional-fitness/custom-obstacle-circuit', 
  validateBody(['athleteId', 'obstacles']), 
  ctrl.createCustomObstacleCircuit
);

router.post('/functional-fitness/execute-obstacle-circuit', 
  validateBody(['athleteId', 'obstacles']), 
  ctrl.executeCustomObstacleCircuit
);

router.get('/functional-fitness/custom-obstacle-circuit', 
  ctrl.getAllCustomObstacleCircuit
);

router.get('/functional-fitness/custom-obstacle-circuit/:id', 
  ctrl.getCustomObstacleCircuitById
);

router.put('/functional-fitness/custom-obstacle-circuit/:id', 
  ctrl.updateCustomObstacleCircuit
);

router.delete('/functional-fitness/custom-obstacle-circuit/:id', 
  ctrl.deleteCustomObstacleCircuit
);

// IOCT (Individual Obstacle Course Test)
router.post('/functional-fitness/ioct', 
  validateBody(['athleteId', 'completionTime']), 
  ctrl.createIOCT
);

router.get('/functional-fitness/ioct', 
  ctrl.getAllIOCT
);

router.get('/functional-fitness/ioct/:id', 
  ctrl.getIOCTById
);

router.put('/functional-fitness/ioct/:id', 
  ctrl.updateIOCT
);

router.delete('/functional-fitness/ioct/:id', 
  ctrl.deleteIOCT
);

// ============================================================================
// REACTION, COORDINATION & REFLEX ROUTES
// ============================================================================

// Simple Reaction Time
router.post('/reaction-coordination/simple-reaction-time', 
  validateBody(['athleteId']), 
  ctrl.createSimpleReactionTime
);

router.post('/reaction-coordination/execute-reaction-time', 
  validateBody(['athleteId']), 
  ctrl.executeSimpleReactionTime
);

router.get('/reaction-coordination/simple-reaction-time', 
  ctrl.getAllSimpleReactionTime
);

router.get('/reaction-coordination/simple-reaction-time/:id', 
  ctrl.getSimpleReactionTimeById
);

router.put('/reaction-coordination/simple-reaction-time/:id', 
  ctrl.updateSimpleReactionTime
);

router.delete('/reaction-coordination/simple-reaction-time/:id', 
  ctrl.deleteSimpleReactionTime
);

// Vestibulo-Ocular Reflex
router.post('/reaction-coordination/vestibulo-ocular-reflex', 
  validateBody(['athleteId', 'headVelocity', 'eyeVelocity']), 
  ctrl.createVestibuloOcularReflex
);

router.get('/reaction-coordination/vestibulo-ocular-reflex', 
  ctrl.getAllVestibuloOcularReflex
);

router.get('/reaction-coordination/vestibulo-ocular-reflex/:id', 
  ctrl.getVestibuloOcularReflexById
);

router.put('/reaction-coordination/vestibulo-ocular-reflex/:id', 
  ctrl.updateVestibuloOcularReflex
);

router.delete('/reaction-coordination/vestibulo-ocular-reflex/:id', 
  ctrl.deleteVestibuloOcularReflex
);

// H-Reflex
router.post('/reaction-coordination/h-reflex', 
  validateBody(['athleteId', 'hReflexAmplitude', 'mWaveAmplitude']), 
  ctrl.createHReflex
);

router.get('/reaction-coordination/h-reflex', 
  ctrl.getAllHReflex
);

router.get('/reaction-coordination/h-reflex/:id', 
  ctrl.getHReflexById
);

router.put('/reaction-coordination/h-reflex/:id', 
  ctrl.updateHReflex
);

router.delete('/reaction-coordination/h-reflex/:id', 
  ctrl.deleteHReflex
);

// Deep Tendon Reflexes (DTR)
router.post('/reaction-coordination/dtr', 
  validateBody(['athleteId', 'reflexes']), 
  ctrl.createDTR
);

router.get('/reaction-coordination/dtr', 
  ctrl.getAllDTR
);

router.get('/reaction-coordination/dtr/:id', 
  ctrl.getDTRById
);

router.put('/reaction-coordination/dtr/:id', 
  ctrl.updateDTR
);

router.delete('/reaction-coordination/dtr/:id', 
  ctrl.deleteDTR
);

// ============================================================================
// SPEED, ACCELERATION & AGILITY ROUTES
// ============================================================================

// Max Run-up Speed
router.post('/speed-agility/max-runup-speed', 
  validateBody(['athleteId', 'distance', 'time']), 
  ctrl.createMaxRunupSpeed
);

router.get('/speed-agility/max-runup-speed', 
  ctrl.getAllMaxRunupSpeed
);

router.get('/speed-agility/max-runup-speed/:id', 
  ctrl.getMaxRunupSpeedById
);

router.put('/speed-agility/max-runup-speed/:id', 
  ctrl.updateMaxRunupSpeed
);

router.delete('/speed-agility/max-runup-speed/:id', 
  ctrl.deleteMaxRunupSpeed
);

// Yo-Yo Intermittent Recovery Test
router.post('/speed-agility/yo-yo-ir', 
  validateBody(['athleteId', 'level', 'shuttles', 'totalDistance']), 
  ctrl.createYoYoIR
);

router.get('/speed-agility/yo-yo-ir', 
  ctrl.getAllYoYoIR
);

router.get('/speed-agility/yo-yo-ir/:id', 
  ctrl.getYoYoIRById
);

router.put('/speed-agility/yo-yo-ir/:id', 
  ctrl.updateYoYoIR
);

router.delete('/speed-agility/yo-yo-ir/:id', 
  ctrl.deleteYoYoIR
);

// Illinois Agility Test
router.post('/speed-agility/illinois-agility-test', 
  validateBody(['athleteId', 'completionTime', 'gender']), 
  ctrl.createIllinoisAgilityTest
);

router.post('/speed-agility/execute-illinois-agility-test', 
  validateBody(['athleteId', 'completionTime', 'gender']), 
  ctrl.executeIllinoisAgilityTest
);

router.get('/speed-agility/illinois-agility-test', 
  ctrl.getAllIllinoisAgilityTest
);

router.get('/speed-agility/illinois-agility-test/:id', 
  ctrl.getIllinoisAgilityTestById
);

router.put('/speed-agility/illinois-agility-test/:id', 
  ctrl.updateIllinoisAgilityTest
);

router.delete('/speed-agility/illinois-agility-test/:id', 
  ctrl.deleteIllinoisAgilityTest
);

// 505 Agility Test
router.post('/speed-agility/505-agility', 
  validateBody(['athleteId', 'completionTime', 'direction']), 
  ctrl.createAgility505
);

router.get('/speed-agility/505-agility', 
  ctrl.getAllAgility505
);

router.get('/speed-agility/505-agility/:id', 
  ctrl.getAgility505ById
);

router.put('/speed-agility/505-agility/:id', 
  ctrl.updateAgility505
);

router.delete('/speed-agility/505-agility/:id', 
  ctrl.deleteAgility505
);

// T-Test
router.post('/speed-agility/t-test', 
  validateBody(['athleteId', 'completionTime']), 
  ctrl.createTTest
);

router.get('/speed-agility/t-test', 
  ctrl.getAllTTest
);

router.get('/speed-agility/t-test/:id', 
  ctrl.getTTestById
);

router.put('/speed-agility/t-test/:id', 
  ctrl.updateTTest
);

router.delete('/speed-agility/t-test/:id', 
  ctrl.deleteTTest
);

// Timing Gates
router.post('/speed-agility/timing-gates', 
  validateBody(['athleteId', 'distances']), 
  ctrl.createTimingGates
);

router.get('/speed-agility/timing-gates', 
  ctrl.getAllTimingGates
);

router.get('/speed-agility/timing-gates/:id', 
  ctrl.getTimingGatesById
);

router.put('/speed-agility/timing-gates/:id', 
  ctrl.updateTimingGates
);

router.delete('/speed-agility/timing-gates/:id', 
  ctrl.deleteTimingGates
);

// ============================================================================
// ANAEROBIC & POWER ROUTES
// ============================================================================

// Vertical Jump
router.post('/anaerobic-power/vertical-jump', 
  validateBody(['athleteId', 'jumpHeight', 'athleteWeight']), 
  ctrl.createVerticalJump
);

router.get('/anaerobic-power/vertical-jump', 
  ctrl.getAllVerticalJump
);

router.get('/anaerobic-power/vertical-jump/:id', 
  ctrl.getVerticalJumpById
);

router.put('/anaerobic-power/vertical-jump/:id', 
  ctrl.updateVerticalJump
);

router.delete('/anaerobic-power/vertical-jump/:id', 
  ctrl.deleteVerticalJump
);

// Broad Jump
router.post('/anaerobic-power/broad-jump', 
  validateBody(['athleteId', 'jumpDistance', 'athleteWeight']), 
  ctrl.createBroadJump
);

router.get('/anaerobic-power/broad-jump', 
  ctrl.getAllBroadJump
);

router.get('/anaerobic-power/broad-jump/:id', 
  ctrl.getBroadJumpById
);

router.put('/anaerobic-power/broad-jump/:id', 
  ctrl.updateBroadJump
);

router.delete('/anaerobic-power/broad-jump/:id', 
  ctrl.deleteBroadJump
);

// Time to Peak Force
router.post('/anaerobic-power/time-to-peak-force', 
  validateBody(['athleteId', 'timeToPeak', 'peakForce']), 
  ctrl.createTimeToPeakForce
);

router.get('/anaerobic-power/time-to-peak-force', 
  ctrl.getAllTimeToPeakForce
);

router.get('/anaerobic-power/time-to-peak-force/:id', 
  ctrl.getTimeToPeakForceById
);

router.put('/anaerobic-power/time-to-peak-force/:id', 
  ctrl.updateTimeToPeakForce
);

router.delete('/anaerobic-power/time-to-peak-force/:id', 
  ctrl.deleteTimeToPeakForce
);

// Wingate Anaerobic Test
router.post('/anaerobic-power/wingate-anaerobic-test', 
  validateBody(['athleteId', 'peakPower', 'meanPower', 'fatigueIndex', 'athleteWeight']), 
  ctrl.createWingateAnaerobicTest
);

router.get('/anaerobic-power/wingate-anaerobic-test', 
  ctrl.getAllWingateAnaerobicTest
);

router.get('/anaerobic-power/wingate-anaerobic-test/:id', 
  ctrl.getWingateAnaerobicTestById
);

router.put('/anaerobic-power/wingate-anaerobic-test/:id', 
  ctrl.updateWingateAnaerobicTest
);

router.delete('/anaerobic-power/wingate-anaerobic-test/:id', 
  ctrl.deleteWingateAnaerobicTest
);

// Flight Test
router.post('/anaerobic-power/flight-test', 
  validateBody(['athleteId', 'flightTime', 'jumpHeight', 'athleteWeight']), 
  ctrl.createFlightTest
);

router.get('/anaerobic-power/flight-test', 
  ctrl.getAllFlightTest
);

router.get('/anaerobic-power/flight-test/:id', 
  ctrl.getFlightTestById
);

router.put('/anaerobic-power/flight-test/:id', 
  ctrl.updateFlightTest
);

router.delete('/anaerobic-power/flight-test/:id', 
  ctrl.deleteFlightTest
);

// ============================================================================
// ANALYTICS & DASHBOARD ROUTES
// ============================================================================

// Generate comprehensive analytics
router.post('/analytics/generate', 
  validateBody(['athleteId', 'startDate', 'endDate']), 
  ctrl.generateSkillPerformanceAnalytics
);

// Get analytics for specific athlete
router.get('/analytics/:athleteId', 
  ctrl.getSkillPerformanceAnalytics
);

// Get dashboard statistics
router.get('/dashboard/:athleteId', 
  ctrl.getDashboardStats
);

// ============================================================================
// BULK OPERATIONS ROUTES
// ============================================================================

// Get all tests for an athlete across all categories
router.get('/athlete/:athleteId/all-tests', async (req, res, next) => {
  try {
    const { athleteId } = req.params;
    const { days = 30 } = req.query;
    
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - (days * 24 * 60 * 60 * 1000));
    
    const [
      dailyReadiness,
      obstacleCircuits,
      reactionTests,
      agilityTests,
      powerTests
    ] = await Promise.all([
      require('../models/skillPerformanceTesting.model').DailyReadiness.find({ 
        athleteId, 
        date: { $gte: startDate, $lte: endDate } 
      }).sort({ date: -1 }),
      require('../models/skillPerformanceTesting.model').CustomObstacleCircuit.find({ 
        athleteId, 
        date: { $gte: startDate, $lte: endDate } 
      }).sort({ date: -1 }),
      require('../models/skillPerformanceTesting.model').SimpleReactionTime.find({ 
        athleteId, 
        date: { $gte: startDate, $lte: endDate } 
      }).sort({ date: -1 }),
      require('../models/skillPerformanceTesting.model').IllinoisAgilityTest.find({ 
        athleteId, 
        date: { $gte: startDate, $lte: endDate } 
      }).sort({ date: -1 }),
      require('../models/skillPerformanceTesting.model').VerticalJump.find({ 
        athleteId, 
        date: { $gte: startDate, $lte: endDate } 
      }).sort({ date: -1 })
    ]);
    
    res.json({
      athleteId,
      period: `${days} days`,
      startDate,
      endDate,
      tests: {
        neuromuscularReadiness: dailyReadiness,
        functionalFitness: obstacleCircuits,
        reactionCoordination: reactionTests,
        speedAgility: agilityTests,
        anaerobicPower: powerTests
      },
      summary: {
        totalTests: dailyReadiness.length + obstacleCircuits.length + 
                    reactionTests.length + agilityTests.length + powerTests.length,
        categoryBreakdown: {
          neuromuscularReadiness: dailyReadiness.length,
          functionalFitness: obstacleCircuits.length,
          reactionCoordination: reactionTests.length,
          speedAgility: agilityTests.length,
          anaerobicPower: powerTests.length
        }
      }
    });
    
  } catch (err) {
    next(err);
  }
});

// ============================================================================
// HEALTH CHECK ROUTE
// ============================================================================

router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    message: 'Skill Performance Testing API is running',
    timestamp: new Date().toISOString(),
    modules: [
      'Neuromuscular Readiness',
      'Functional Fitness Simulation',
      'Reaction, Coordination & Reflex',
      'Speed, Acceleration & Agility',
      'Anaerobic & Power'
    ]
  });
});

module.exports = router;
