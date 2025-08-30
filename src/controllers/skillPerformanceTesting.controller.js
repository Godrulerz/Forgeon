const {
  DailyReadiness,
  CustomObstacleCircuit,
  IOCT,
  SimpleReactionTime,
  VestibuloOcularReflex,
  HReflex,
  DTR,
  MaxRunupSpeed,
  YoYoIR,
  IllinoisAgilityTest,
  Agility505,
  TTest,
  TimingGates,
  VerticalJump,
  BroadJump,
  TimeToPeakForce,
  WingateAnaerobicTest,
  FlightTest,
  SkillPerformanceAnalytics
} = require('../models/skillPerformanceTesting.model');

const { exec } = require('child_process');
const path = require('path');

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const executePythonScript = async (scriptPath, args = []) => {
  return new Promise((resolve, reject) => {
    const command = `python "${scriptPath}" ${args.join(' ')}`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Python script error:', error);
        reject(error);
        return;
      }
      if (stderr) {
        console.warn('Python script stderr:', stderr);
      }
      resolve(stdout);
    });
  });
};

const calculatePerformanceRating = (value, thresholds, isLowerBetter = true) => {
  if (isLowerBetter) {
    if (value <= thresholds.excellent) return 'excellent';
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.average) return 'average';
    if (value <= thresholds.below_average) return 'below_average';
    return 'poor';
  } else {
    if (value >= thresholds.excellent) return 'excellent';
    if (value >= thresholds.good) return 'good';
    if (value >= thresholds.average) return 'average';
    if (value >= thresholds.below_average) return 'below_average';
    return 'poor';
  }
};

const calculatePercentile = (value, normativeData, isLowerBetter = true) => {
  // Simple percentile calculation based on normative data
  // In a real system, this would use more sophisticated statistical methods
  if (isLowerBetter) {
    if (value <= normativeData.excellent) return 90;
    if (value <= normativeData.good) return 75;
    if (value <= normativeData.average) return 50;
    if (value <= normativeData.below_average) return 25;
    return 10;
  } else {
    if (value >= normativeData.excellent) return 90;
    if (value >= normativeData.good) return 75;
    if (value >= normativeData.average) return 50;
    if (value >= normativeData.below_average) return 25;
    return 10;
  }
};

// ============================================================================
// NEUROMUSCULAR READINESS CONTROLLERS
// ============================================================================

exports.createDailyReadiness = async (req, res, next) => {
  try {
    const readiness = await DailyReadiness.create(req.body);
    res.status(201).json(readiness);
  } catch (err) {
    next(err);
  }
};

exports.getDailyReadiness = async (req, res, next) => {
  try {
    const { athleteId } = req.params;
    const { days = 30 } = req.query;
    
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - (days * 24 * 60 * 60 * 1000));
    
    const readiness = await DailyReadiness.find({
      athleteId,
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: -1 });
    
    res.json(readiness);
  } catch (err) {
    next(err);
  }
};

exports.executeDailyReadiness = async (req, res, next) => {
  try {
    const { athleteId } = req.body;
    
    const scriptPath = path.join(__dirname, '../Skill-Related & Performance Testing/Neuromuscular Readiness/DailyReadinessAssessment.py');
    
    try {
      const output = await executePythonScript(scriptPath, ['--athlete-id', athleteId]);
      
      // Parse Python output and create readiness assessment
      const readiness = await DailyReadiness.create({
        athleteId,
        scores: {
          sleepQuality: 4, // Default values - in real system, parse from Python output
          fatigue: 3,
          muscleSoreness: 4,
          stressLevels: 3,
          mood: 4
        }
      });
      
      res.json({
        readiness,
        pythonOutput: output,
        message: 'Daily readiness assessment completed'
      });
      
    } catch (pythonError) {
      res.status(500).json({
        message: 'Python script execution failed',
        error: pythonError.message
      });
    }
    
  } catch (err) {
    next(err);
  }
};

// ============================================================================
// FUNCTIONAL FITNESS SIMULATION CONTROLLERS
// ============================================================================

exports.createCustomObstacleCircuit = async (req, res, next) => {
  try {
    const circuit = await CustomObstacleCircuit.create(req.body);
    res.status(201).json(circuit);
  } catch (err) {
    next(err);
  }
};

exports.executeCustomObstacleCircuit = async (req, res, next) => {
  try {
    const { athleteId, obstacles, cutoffTime } = req.body;
    
    const scriptPath = path.join(__dirname, '../Skill-Related & Performance Testing/Functional Fitness Simulation/CustomObstacleCircuit.py');
    
    try {
      // Execute Python script with obstacle data
      const obstacleArgs = obstacles.map(obs => 
        `--obstacle ${obs.name} ${obs.time} ${obs.penalties}`
      ).join(' ');
      
      const args = ['--athlete-id', athleteId, ...obstacleArgs];
      if (cutoffTime) args.push('--cutoff', cutoffTime.toString());
      
      const output = await executePythonScript(scriptPath, args);
      
      // Create obstacle circuit record
      const circuit = await CustomObstacleCircuit.create({
        athleteId,
        testName: 'Custom Obstacle Circuit',
        obstacles: obstacles.map(obs => ({
          ...obs,
          adjustedTime: obs.time + (obs.penalties * (obs.penaltyTime || 5))
        })),
        cutoffTime
      });
      
      res.json({
        circuit,
        pythonOutput: output,
        message: 'Obstacle circuit completed'
      });
      
    } catch (pythonError) {
      res.status(500).json({
        message: 'Python script execution failed',
        error: pythonError.message
      });
    }
    
  } catch (err) {
    next(err);
  }
};

exports.createIOCT = async (req, res, next) => {
  try {
    const ioct = await IOCT.create(req.body);
    res.status(201).json(ioct);
  } catch (err) {
    next(err);
  }
};

// ============================================================================
// REACTION, COORDINATION & REFLEX CONTROLLERS
// ============================================================================

exports.createSimpleReactionTime = async (req, res, next) => {
  try {
    const reactionTime = await SimpleReactionTime.create(req.body);
    res.status(201).json(reactionTime);
  } catch (err) {
    next(err);
  }
};

exports.executeSimpleReactionTime = async (req, res, next) => {
  try {
    const { athleteId, lightTrials, soundTrials } = req.body;
    
    const scriptPath = path.join(__dirname, '../Skill-Related & Performance Testing/Reaction, Coordination & Reflex/SimpleReactionTime.py');
    
    try {
      // Execute Python script
      const args = ['--athlete-id', athleteId];
      if (lightTrials) args.push('--light-trials', lightTrials.join(','));
      if (soundTrials) args.push('--sound-trials', soundTrials.join(','));
      
      const output = await executePythonScript(scriptPath, args);
      
      // Calculate metrics
      const allTrials = [...(lightTrials || []), ...(soundTrials || [])];
      const metrics = {
        lightAvgTime: lightTrials?.length ? lightTrials.reduce((a, b) => a + b, 0) / lightTrials.length : null,
        lightBestTime: lightTrials?.length ? Math.min(...lightTrials) : null,
        soundAvgTime: soundTrials?.length ? soundTrials.reduce((a, b) => a + b, 0) / soundTrials.length : null,
        soundBestTime: soundTrials?.length ? Math.min(...soundTrials) : null,
        combinedAvgTime: allTrials.length ? allTrials.reduce((a, b) => a + b, 0) / allTrials.length : null,
        combinedBestTime: allTrials.length ? Math.min(...allTrials) : null
      };
      
      const reactionTime = await SimpleReactionTime.create({
        athleteId,
        lightTrials: lightTrials?.map((time, i) => ({
          trial: i + 1,
          reactionTime: time,
          stimulusType: 'light',
          accuracy: true
        })) || [],
        soundTrials: soundTrials?.map((time, i) => ({
          trial: i + 1,
          reactionTime: time,
          stimulusType: 'sound',
          accuracy: true
        })) || [],
        combinedTrials: allTrials.map((time, i) => ({
          trial: i + 1,
          reactionTime: time,
          stimulusType: 'light',
          accuracy: true
        })),
        metrics
      });
      
      res.json({
        reactionTime,
        pythonOutput: output,
        message: 'Reaction time test completed'
      });
      
    } catch (pythonError) {
      res.status(500).json({
        message: 'Python script execution failed',
        error: pythonError.message
      });
    }
    
  } catch (err) {
    next(err);
  }
};

exports.createVestibuloOcularReflex = async (req, res, next) => {
  try {
    const vor = await VestibuloOcularReflex.create(req.body);
    res.status(201).json(vor);
  } catch (err) {
    next(err);
  }
};

exports.createHReflex = async (req, res, next) => {
  try {
    const hReflex = await HReflex.create(req.body);
    res.status(201).json(hReflex);
  } catch (err) {
    next(err);
  }
};

exports.createDTR = async (req, res, next) => {
  try {
    const dtr = await DTR.create(req.body);
    res.status(201).json(dtr);
  } catch (err) {
    next(err);
  }
};

// ============================================================================
// SPEED, ACCELERATION & AGILITY CONTROLLERS
// ============================================================================

exports.createMaxRunupSpeed = async (req, res, next) => {
  try {
    const { distance, time } = req.body;
    const speed = distance / time;
    
    const maxRunupSpeed = await MaxRunupSpeed.create({
      ...req.body,
      speed
    });
    
    res.status(201).json(maxRunupSpeed);
  } catch (err) {
    next(err);
  }
};

exports.createYoYoIR = async (req, res, next) => {
  try {
    const yoYoIR = await YoYoIR.create(req.body);
    res.status(201).json(yoYoIR);
  } catch (err) {
    next(err);
  }
};

exports.createIllinoisAgilityTest = async (req, res, next) => {
  try {
    const { completionTime, gender } = req.body;
    
    // Calculate performance rating based on gender and time
    let rating;
    if (gender.toLowerCase() === 'male') {
      if (completionTime < 15.2) rating = 'excellent';
      else if (completionTime < 16.1) rating = 'good';
      else if (completionTime < 18.1) rating = 'average';
      else if (completionTime < 19.3) rating = 'below_average';
      else rating = 'poor';
    } else {
      if (completionTime < 17.0) rating = 'excellent';
      else if (completionTime < 17.9) rating = 'good';
      else if (completionTime < 21.0) rating = 'average';
      else if (completionTime < 23.0) rating = 'below_average';
      else rating = 'poor';
    }
    
    const illinoisTest = await IllinoisAgilityTest.create({
      ...req.body,
      performance: { rating, percentile: 50, trend: 'stable' }
    });
    
    res.status(201).json(illinoisTest);
  } catch (err) {
    next(err);
  }
};

exports.executeIllinoisAgilityTest = async (req, res, next) => {
  try {
    const { athleteId, completionTime, gender } = req.body;
    
    const scriptPath = path.join(__dirname, '../Skill-Related & Performance Testing/Speed, Acceleration & Agility/IllinoisAgilityTest.py');
    
    try {
      const output = await executePythonScript(scriptPath, [
        '--time', completionTime.toString(),
        '--gender', gender
      ]);
      
      // Create test record
      const illinoisTest = await IllinoisAgilityTest.create({
        athleteId,
        completionTime,
        gender,
        performance: { rating: 'average', percentile: 50, trend: 'stable' }
      });
      
      res.json({
        illinoisTest,
        pythonOutput: output,
        message: 'Illinois Agility Test completed'
      });
      
    } catch (pythonError) {
      res.status(500).json({
        message: 'Python script execution failed',
        error: pythonError.message
      });
    }
    
  } catch (err) {
    next(err);
  }
};

exports.createAgility505 = async (req, res, next) => {
  try {
    const agility505 = await Agility505.create(req.body);
    res.status(201).json(agility505);
  } catch (err) {
    next(err);
  }
};

exports.createTTest = async (req, res, next) => {
  try {
    const tTest = await TTest.create(req.body);
    res.status(201).json(tTest);
  } catch (err) {
    next(err);
  }
};

exports.createTimingGates = async (req, res, next) => {
  try {
    const { distances } = req.body;
    const totalTime = distances.reduce((sum, dist) => sum + dist.time, 0);
    
    const timingGates = await TimingGates.create({
      ...req.body,
      totalTime
    });
    
    res.status(201).json(timingGates);
  } catch (err) {
    next(err);
  }
};

// ============================================================================
// ANAEROBIC & POWER CONTROLLERS
// ============================================================================

exports.createVerticalJump = async (req, res, next) => {
  try {
    const { jumpHeight, athleteWeight } = req.body;
    
    // Calculate power (simplified calculation)
    const gravity = 9.81;
    const takeoffVelocity = Math.sqrt(2 * gravity * (jumpHeight / 100));
    const power = athleteWeight * gravity * takeoffVelocity;
    const relativePower = power / athleteWeight;
    
    const verticalJump = await VerticalJump.create({
      ...req.body,
      takeoffVelocity,
      power,
      relativePower,
      performance: { rating: 'average', percentile: 50, trend: 'stable' }
    });
    
    res.status(201).json(verticalJump);
  } catch (err) {
    next(err);
  }
};

exports.createBroadJump = async (req, res, next) => {
  try {
    const { jumpDistance, athleteWeight } = req.body;
    
    // Calculate power (simplified calculation)
    const gravity = 9.81;
    const takeoffVelocity = Math.sqrt(2 * gravity * (jumpDistance / 100));
    const power = athleteWeight * gravity * takeoffVelocity;
    const relativePower = power / athleteWeight;
    
    const broadJump = await BroadJump.create({
      ...req.body,
      takeoffVelocity,
      power,
      relativePower,
      performance: { rating: 'average', percentile: 50, trend: 'stable' }
    });
    
    res.status(201).json(broadJump);
  } catch (err) {
    next(err);
  }
};

exports.createTimeToPeakForce = async (req, res, next) => {
  try {
    const { timeToPeak, peakForce } = req.body;
    
    // Calculate rate of force development
    const rateOfForceDevelopment = peakForce / (timeToPeak / 1000); // Convert ms to seconds
    
    const timeToPeakForce = await TimeToPeakForce.create({
      ...req.body,
      rateOfForceDevelopment,
      performance: { rating: 'average', percentile: 50, trend: 'stable' }
    });
    
    res.status(201).json(timeToPeakForce);
  } catch (err) {
    next(err);
  }
};

exports.createWingateAnaerobicTest = async (req, res, next) => {
  try {
    const { peakPower, meanPower, athleteWeight } = req.body;
    
    // Calculate relative power
    const relativePeakPower = peakPower / athleteWeight;
    const relativeMeanPower = meanPower / athleteWeight;
    
    const wingateTest = await WingateAnaerobicTest.create({
      ...req.body,
      relativePeakPower,
      relativeMeanPower,
      performance: { rating: 'average', percentile: 50, trend: 'stable' }
    });
    
    res.status(201).json(wingateTest);
  } catch (err) {
    next(err);
  }
};

exports.createFlightTest = async (req, res, next) => {
  try {
    const { flightTime, jumpHeight, athleteWeight } = req.body;
    
    // Calculate power (simplified calculation)
    const gravity = 9.81;
    const power = athleteWeight * gravity * (jumpHeight / 100) / flightTime;
    const relativePower = power / athleteWeight;
    
    const flightTest = await FlightTest.create({
      ...req.body,
      power,
      relativePower,
      performance: { rating: 'average', percentile: 50, trend: 'stable' }
    });
    
    res.status(201).json(flightTest);
  } catch (err) {
    next(err);
  }
};

// ============================================================================
// ANALYTICS CONTROLLERS
// ============================================================================

exports.generateSkillPerformanceAnalytics = async (req, res, next) => {
  try {
    const { athleteId, period = 'month', startDate, endDate, category = 'overall' } = req.body;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Get all test data for the athlete in the specified period
    const [
      dailyReadiness,
      obstacleCircuits,
      reactionTests,
      agilityTests,
      powerTests
    ] = await Promise.all([
      DailyReadiness.find({ athleteId, date: { $gte: start, $lte: end } }),
      CustomObstacleCircuit.find({ athleteId, date: { $gte: start, $lte: end } }),
      SimpleReactionTime.find({ athleteId, date: { $gte: start, $lte: end } }),
      IllinoisAgilityTest.find({ athleteId, date: { $gte: start, $lte: end } }),
      VerticalJump.find({ athleteId, date: { $gte: start, $lte: end } })
    ]);
    
    // Calculate aggregate metrics
    const totalTests = dailyReadiness.length + obstacleCircuits.length + 
                      reactionTests.length + agilityTests.length + powerTests.length;
    
    let averageScore = 0;
    let improvementRate = 0;
    let consistencyScore = 0;
    let bestPerformance = 0;
    let worstPerformance = 0;
    
    // Calculate metrics based on test types
    if (dailyReadiness.length > 0) {
      const readinessScores = dailyReadiness.map(r => r.readinessPercentage);
      averageScore = readinessScores.reduce((a, b) => a + b, 0) / readinessScores.length;
      bestPerformance = Math.max(...readinessScores);
      worstPerformance = Math.min(...readinessScores);
    }
    
    // Determine trends
    let overallTrend = 'stable';
    if (totalTests >= 2) {
      // Simple trend calculation - in real system, use more sophisticated analysis
      const recentTests = [dailyReadiness.slice(-3), obstacleCircuits.slice(-3), 
                          reactionTests.slice(-3), agilityTests.slice(-3), powerTests.slice(-3)];
      const recentScores = recentTests.flat().map(test => test.performance?.rating || 'average');
      
      const improving = recentScores.filter(r => r === 'excellent' || r === 'good').length;
      const declining = recentScores.filter(r => r === 'poor' || r === 'below_average').length;
      
      if (improving > declining) overallTrend = 'improving';
      else if (declining > improving) overallTrend = 'declining';
    }
    
    // Generate recommendations
    const recommendations = [];
    if (averageScore < 70) {
      recommendations.push({
        category: 'performance',
        title: 'Improve Overall Performance',
        description: 'Your average performance score is below optimal levels.',
        priority: 'high',
        actionItems: [
          'Focus on consistent training',
          'Review test preparation',
          'Consult with coach for technique improvement'
        ]
      });
    }
    
    if (totalTests < 3) {
      recommendations.push({
        category: 'frequency',
        title: 'Increase Testing Frequency',
        description: 'More regular testing will provide better performance insights.',
        priority: 'medium',
        actionItems: [
          'Schedule weekly performance tests',
          'Maintain testing consistency',
          'Track progress over time'
        ]
      });
    }
    
    const analytics = await SkillPerformanceAnalytics.create({
      athleteId,
      period,
      startDate: start,
      endDate: end,
      category,
      metrics: {
        totalTests,
        averageScore: Math.round(averageScore),
        improvementRate: Math.round(improvementRate),
        consistencyScore: Math.round(consistencyScore),
        bestPerformance: Math.round(bestPerformance),
        worstPerformance: Math.round(worstPerformance)
      },
      trends: {
        overallTrend,
        fastestImproving: 'neuromuscular_readiness',
        slowestImproving: 'speed_agility',
        consistencyTrend: 'stable'
      },
      recommendations,
      testIds: {
        dailyReadiness: dailyReadiness.map(r => r._id),
        obstacleCircuits: obstacleCircuits.map(c => c._id),
        reactionTests: reactionTests.map(r => r._id),
        agilityTests: agilityTests.map(a => a._id),
        powerTests: powerTests.map(p => p._id)
      }
    });
    
    res.json(analytics);
    
  } catch (err) {
    next(err);
  }
};

exports.getSkillPerformanceAnalytics = async (req, res, next) => {
  try {
    const { athleteId } = req.params;
    const { period = 'month', category } = req.query;
    
    const filter = { athleteId, period };
    if (category) filter.category = category;
    
    const analytics = await SkillPerformanceAnalytics.find(filter)
      .sort({ startDate: -1 })
      .populate('testIds.dailyReadiness')
      .populate('testIds.obstacleCircuits')
      .populate('testIds.reactionTests')
      .populate('testIds.agilityTests')
      .populate('testIds.powerTests');
    
    res.json(analytics);
  } catch (err) {
    next(err);
  }
};

exports.getDashboardStats = async (req, res, next) => {
  try {
    const { athleteId } = req.params;
    const { days = 30 } = req.query;
    
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - (days * 24 * 60 * 60 * 1000));
    
    // Get recent test data
    const [
      dailyReadiness,
      obstacleCircuits,
      reactionTests,
      agilityTests,
      powerTests
    ] = await Promise.all([
      DailyReadiness.find({ athleteId, date: { $gte: startDate, $lte: endDate } }),
      CustomObstacleCircuit.find({ athleteId, date: { $gte: startDate, $lte: endDate } }),
      SimpleReactionTime.find({ athleteId, date: { $gte: startDate, $lte: endDate } }),
      IllinoisAgilityTest.find({ athleteId, date: { $gte: startDate, $lte: endDate } }),
      VerticalJump.find({ athleteId, date: { $gte: startDate, $lte: endDate } })
    ]);
    
    const stats = {
      totalTests: dailyReadiness.length + obstacleCircuits.length + 
                  reactionTests.length + agilityTests.length + powerTests.length,
      categoryBreakdown: {
        neuromuscularReadiness: dailyReadiness.length,
        functionalFitness: obstacleCircuits.length,
        reactionCoordination: reactionTests.length,
        speedAgility: agilityTests.length,
        anaerobicPower: powerTests.length
      },
      recentPerformance: {
        avgReadiness: dailyReadiness.length > 0 ? 
          Math.round(dailyReadiness.reduce((sum, r) => sum + r.readinessPercentage, 0) / dailyReadiness.length) : 0,
        avgReactionTime: reactionTests.length > 0 ? 
          Math.round(reactionTests.reduce((sum, r) => sum + (r.metrics.combinedAvgTime || 0), 0) / reactionTests.length) : 0,
        avgAgilityTime: agilityTests.length > 0 ? 
          Math.round(agilityTests.reduce((sum, a) => sum + a.completionTime, 0) / agilityTests.length * 100) / 100 : 0,
        avgJumpHeight: powerTests.length > 0 ? 
          Math.round(powerTests.reduce((sum, p) => sum + p.jumpHeight, 0) / powerTests.length) : 0
      },
      trends: {
        readiness: dailyReadiness.length >= 2 ? 
          (dailyReadiness[dailyReadiness.length - 1].readinessPercentage > dailyReadiness[0].readinessPercentage ? 'improving' : 'declining') : 'stable',
        reaction: reactionTests.length >= 2 ? 
          (reactionTests[reactionTests.length - 1].metrics.combinedAvgTime < reactionTests[0].metrics.combinedAvgTime ? 'improving' : 'declining') : 'stable',
        agility: agilityTests.length >= 2 ? 
          (agilityTests[agilityTests.length - 1].completionTime < agilityTests[0].completionTime ? 'improving' : 'declining') : 'stable',
        power: powerTests.length >= 2 ? 
          (powerTests[powerTests.length - 1].jumpHeight > powerTests[0].jumpHeight ? 'improving' : 'declining') : 'stable'
      }
    };
    
    res.json(stats);
  } catch (err) {
    next(err);
  }
};

// ============================================================================
// GENERIC CRUD OPERATIONS
// ============================================================================

const createGenericCRUD = (Model) => ({
  create: async (req, res, next) => {
    try {
      const item = await Model.create(req.body);
      res.status(201).json(item);
    } catch (err) {
      next(err);
    }
  },
  
  getAll: async (req, res, next) => {
    try {
      const { athleteId } = req.query;
      const filter = athleteId ? { athleteId } : {};
      const items = await Model.find(filter).sort({ date: -1 });
      res.json(items);
    } catch (err) {
      next(err);
    }
  },
  
  getById: async (req, res, next) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ message: 'Item not found' });
      res.json(item);
    } catch (err) {
      next(err);
    }
  },
  
  update: async (req, res, next) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!item) return res.status(404).json({ message: 'Item not found' });
      res.json(item);
    } catch (err) {
      next(err);
    }
  },
  
  delete: async (req, res, next) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ message: 'Item not found' });
      res.json({ message: 'Item deleted successfully' });
    } catch (err) {
      next(err);
    }
  }
});

// Export generic CRUD for each model
Object.keys({
  DailyReadiness,
  CustomObstacleCircuit,
  IOCT,
  SimpleReactionTime,
  VestibuloOcularReflex,
  HReflex,
  DTR,
  MaxRunupSpeed,
  YoYoIR,
  IllinoisAgilityTest,
  Agility505,
  TTest,
  TimingGates,
  VerticalJump,
  BroadJump,
  TimeToPeakForce,
  WingateAnaerobicTest,
  FlightTest
}).forEach(modelName => {
  const Model = eval(modelName);
  const crud = createGenericCRUD(Model);
  
  exports[`create${modelName}`] = crud.create;
  exports[`getAll${modelName}`] = crud.getAll;
  exports[`get${modelName}ById`] = crud.getById;
  exports[`update${modelName}`] = crud.update;
  exports[`delete${modelName}`] = crud.delete;
});
