const { Drill, Session, MentalNeuralAnalytics } = require('../models/mentalNeuralTraining.model');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs').promises;

// Utility function to execute Python script
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

// DRILLS
exports.createDrill = async (req, res, next) => {
  try {
    const drill = await Drill.create(req.body);
    res.status(201).json(drill);
  } catch (err) {
    next(err);
  }
};

exports.listDrills = async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.category) filter.category = req.query.category;
    if (req.query.difficulty) filter.difficulty = req.query.difficulty;
    
    const drills = await Drill.find(filter).sort({ createdAt: -1 });
    res.json(drills);
  } catch (err) {
    next(err);
  }
};

exports.getDrill = async (req, res, next) => {
  try {
    const drill = await Drill.findById(req.params.id);
    if (!drill) return res.status(404).json({ message: 'Drill not found' });
    res.json(drill);
  } catch (err) {
    next(err);
  }
};

exports.updateDrill = async (req, res, next) => {
  try {
    const drill = await Drill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!drill) return res.status(404).json({ message: 'Drill not found' });
    res.json(drill);
  } catch (err) {
    next(err);
  }
};

exports.deleteDrill = async (req, res, next) => {
  try {
    const drill = await Drill.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!drill) return res.status(404).json({ message: 'Drill not found' });
    res.json({ message: 'Drill deactivated successfully' });
  } catch (err) {
    next(err);
  }
};

// SESSIONS
exports.createSession = async (req, res, next) => {
  try {
    const session = await Session.create(req.body);
    res.status(201).json(session);
  } catch (err) {
    next(err);
  }
};

exports.listSessions = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.athleteId) filter.athleteId = req.query.athleteId;
    if (req.query.drillId) filter.drillId = req.query.drillId;
    if (req.query.status) filter.status = req.query.status;
    
    const sessions = await Session.find(filter)
      .populate('drillId')
      .sort({ startedAt: -1 });
    res.json(sessions);
  } catch (err) {
    next(err);
  }
};

exports.getSession = async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id).populate('drillId');
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (err) {
    next(err);
  }
};

exports.updateSession = async (req, res, next) => {
  try {
    const session = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (err) {
    next(err);
  }
};

exports.deleteSession = async (req, res, next) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json({ message: 'Session deleted' });
  } catch (err) {
    next(err);
  }
};

// SESSION EXECUTION
exports.startSession = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const session = await Session.findById(sessionId).populate('drillId');
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    
    if (session.status !== 'scheduled') {
      return res.status(400).json({ message: 'Session cannot be started' });
    }
    
    session.status = 'in_progress';
    session.startedAt = new Date();
    await session.save();
    
    res.json(session);
  } catch (err) {
    next(err);
  }
};

exports.completeSession = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const { results } = req.body;
    
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    
    session.status = 'completed';
    session.endedAt = new Date();
    session.results = results;
    await session.save();
    
    // Generate analytics after completion
    await generateSessionAnalytics(session.athleteId, session._id);
    
    res.json(session);
  } catch (err) {
    next(err);
  }
};

// PYTHON SCRIPT INTEGRATION
exports.executeDrill = async (req, res, next) => {
  try {
    const { drillId, athleteId, duration = 30 } = req.body;
    
    const drill = await Drill.findById(drillId);
    if (!drill) {
      return res.status(404).json({ message: 'Drill not found' });
    }
    
    const scriptPath = path.join(__dirname, '../MentalNeuralTraining/script.py');
    
    // Create a temporary session for execution
    const session = await Session.create({
      athleteId,
      drillId,
      status: 'in_progress',
      startedAt: new Date()
    });
    
    try {
      // Execute Python script with parameters
      const output = await executePythonScript(scriptPath, [
        '--drill-id', drillId,
        '--athlete-id', athleteId,
        '--duration', duration.toString(),
        '--session-id', session._id.toString()
      ]);
      
      // Parse Python output and update session
      const results = parsePythonOutput(output);
      session.results = results;
      session.status = 'completed';
      session.endedAt = new Date();
      await session.save();
      
      // Generate analytics
      await generateSessionAnalytics(athleteId, session._id);
      
      res.json({
        session,
        pythonOutput: output,
        summary: session.metrics
      });
      
    } catch (pythonError) {
      session.status = 'cancelled';
      await session.save();
      throw pythonError;
    }
    
  } catch (err) {
    next(err);
  }
};

// ANALYTICS
exports.getAthleteAnalytics = async (req, res, next) => {
  try {
    const { athleteId } = req.params;
    const { period = 'month', category } = req.query;
    
    const filter = { athleteId, period };
    if (category) filter.category = category;
    
    const analytics = await MentalNeuralAnalytics.find(filter)
      .sort({ startDate: -1 })
      .populate('sessionIds');
    
    res.json(analytics);
  } catch (err) {
    next(err);
  }
};

exports.generateAnalytics = async (req, res, next) => {
  try {
    const { athleteId, period = 'month', startDate, endDate } = req.body;
    
    const analytics = await generateComprehensiveAnalytics(athleteId, period, startDate, endDate);
    res.json(analytics);
  } catch (err) {
    next(err);
  }
};

exports.getPerformanceTrends = async (req, res, next) => {
  try {
    const { athleteId } = req.params;
    const { days = 30 } = req.query;
    
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - (days * 24 * 60 * 60 * 1000));
    
    const sessions = await Session.find({
      athleteId,
      startedAt: { $gte: startDate, $lte: endDate },
      status: 'completed'
    }).populate('drillId').sort({ startedAt: 1 });
    
    const trends = analyzePerformanceTrends(sessions);
    res.json(trends);
  } catch (err) {
    next(err);
  }
};

// UTILITY FUNCTIONS
const parsePythonOutput = (output) => {
  try {
    // Parse the Python script output to extract results
    const lines = output.split('\n');
    const results = [];
    
    for (const line of lines) {
      if (line.includes('Reaction Time:')) {
        const match = line.match(/Reaction Time: (\d+)ms/);
        if (match) {
          results.push({
            trial: results.length + 1,
            reactionTime: parseInt(match[1]),
            accuracy: true,
            timestamp: new Date(),
            stimulusType: 'visual',
            responseType: 'correct',
            difficulty: 'medium'
          });
        }
      }
    }
    
    return results;
  } catch (error) {
    console.error('Error parsing Python output:', error);
    return [];
  }
};

const generateSessionAnalytics = async (athleteId, sessionId) => {
  try {
    const session = await Session.findById(sessionId).populate('drillId');
    if (!session || session.status !== 'completed') return;
    
    // Calculate percentile based on normative data
    const drill = session.drillId;
    const normativeData = drill.normativeData[session.settings.difficulty || 'intermediate'];
    
    let percentile = 50; // Default
    if (normativeData && session.metrics.avgReactionTime) {
      const avgRT = session.metrics.avgReactionTime;
      const normRT = normativeData.avgReactionTime;
      
      if (avgRT <= normRT * 0.8) percentile = 90;
      else if (avgRT <= normRT * 0.9) percentile = 75;
      else if (avgRT <= normRT) percentile = 50;
      else if (avgRT <= normRT * 1.1) percentile = 25;
      else percentile = 10;
    }
    
    session.performance.percentile = percentile;
    await session.save();
    
  } catch (error) {
    console.error('Error generating session analytics:', error);
  }
};

const generateComprehensiveAnalytics = async (athleteId, period, startDate, endDate) => {
  try {
    const sessions = await Session.find({
      athleteId,
      startedAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      status: 'completed'
    }).populate('drillId');
    
    if (sessions.length === 0) {
      return {
        athleteId,
        period,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        category: 'overall',
        metrics: {
          avgReactionTime: 0,
          bestReactionTime: 0,
          accuracy: 0,
          consistencyScore: 0,
          improvementRate: 0,
          sessionsCompleted: 0,
          totalDrills: 0
        },
        trends: {
          reactionTime: 'stable',
          accuracy: 'stable',
          consistency: 'stable',
          overallTrend: 'stable'
        },
        recommendations: [],
        sessionIds: []
      };
    }
    
    // Calculate aggregate metrics
    const avgReactionTime = Math.round(
      sessions.reduce((sum, s) => sum + (s.metrics.avgReactionTime || 0), 0) / sessions.length
    );
    
    const bestReactionTime = Math.min(
      ...sessions.map(s => s.metrics.bestReactionTime || Infinity)
    );
    
    const avgAccuracy = Math.round(
      sessions.reduce((sum, s) => sum + (s.metrics.accuracy || 0), 0) / sessions.length
    );
    
    const avgConsistency = Math.round(
      sessions.reduce((sum, s) => sum + (s.metrics.consistencyScore || 0), 0) / sessions.length
    );
    
    // Calculate trends
    const sortedSessions = sessions.sort((a, b) => a.startedAt - b.startedAt);
    const trends = analyzePerformanceTrends(sortedSessions);
    
    // Generate recommendations
    const recommendations = generateRecommendations(sessions, avgReactionTime, avgAccuracy);
    
    const analytics = await MentalNeuralAnalytics.create({
      athleteId,
      period,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      category: 'overall',
      metrics: {
        avgReactionTime,
        bestReactionTime: bestReactionTime === Infinity ? 0 : bestReactionTime,
        accuracy: avgAccuracy,
        consistencyScore: avgConsistency,
        improvementRate: trends.improvementRate || 0,
        sessionsCompleted: sessions.length,
        totalDrills: new Set(sessions.map(s => s.drillId._id.toString())).size
      },
      trends: trends.overall,
      recommendations,
      sessionIds: sessions.map(s => s._id)
    });
    
    return analytics;
    
  } catch (error) {
    console.error('Error generating comprehensive analytics:', error);
    throw error;
  }
};

const analyzePerformanceTrends = (sessions) => {
  if (sessions.length < 2) {
    return {
      reactionTime: 'stable',
      accuracy: 'stable',
      consistency: 'stable',
      overallTrend: 'stable',
      improvementRate: 0
    };
  }
  
  const recentSessions = sessions.slice(-5); // Last 5 sessions
  const olderSessions = sessions.slice(0, -5); // Previous sessions
  
  if (olderSessions.length === 0) {
    return {
      reactionTime: 'stable',
      accuracy: 'stable',
      consistency: 'stable',
      overallTrend: 'stable',
      improvementRate: 0
    };
  }
  
  const recentAvgRT = recentSessions.reduce((sum, s) => sum + (s.metrics.avgReactionTime || 0), 0) / recentSessions.length;
  const olderAvgRT = olderSessions.reduce((sum, s) => sum + (s.metrics.avgReactionTime || 0), 0) / olderSessions.length;
  
  const recentAccuracy = recentSessions.reduce((sum, s) => sum + (s.metrics.accuracy || 0), 0) / recentSessions.length;
  const olderAccuracy = olderSessions.reduce((sum, s) => sum + (s.metrics.accuracy || 0), 0) / olderSessions.length;
  
  const recentConsistency = recentSessions.reduce((sum, s) => sum + (s.metrics.consistencyScore || 0), 0) / recentSessions.length;
  const olderConsistency = olderSessions.reduce((sum, s) => sum + (s.metrics.consistencyScore || 0), 0) / olderSessions.length;
  
  const rtTrend = recentAvgRT < olderAvgRT * 0.95 ? 'improving' : recentAvgRT > olderAvgRT * 1.05 ? 'declining' : 'stable';
  const accuracyTrend = recentAccuracy > olderAccuracy * 1.05 ? 'improving' : recentAccuracy < olderAccuracy * 0.95 ? 'declining' : 'stable';
  const consistencyTrend = recentConsistency > olderConsistency * 1.05 ? 'improving' : recentConsistency < olderConsistency * 0.95 ? 'declining' : 'stable';
  
  const improvementRate = Math.round(((olderAvgRT - recentAvgRT) / olderAvgRT) * 100);
  
  // Determine overall trend
  const improvingCount = [rtTrend, accuracyTrend, consistencyTrend].filter(t => t === 'improving').length;
  const decliningCount = [rtTrend, accuracyTrend, consistencyTrend].filter(t => t === 'declining').length;
  
  let overallTrend = 'stable';
  if (improvingCount >= 2) overallTrend = 'improving';
  else if (decliningCount >= 2) overallTrend = 'declining';
  
  return {
    reactionTime: rtTrend,
    accuracy: accuracyTrend,
    consistency: consistencyTrend,
    overallTrend,
    improvementRate
  };
};

const generateRecommendations = (sessions, avgReactionTime, avgAccuracy) => {
  const recommendations = [];
  
  if (avgReactionTime > 600) {
    recommendations.push({
      category: 'reaction_time',
      title: 'Improve Reaction Speed',
      description: 'Your average reaction time is above optimal levels. Focus on reaction time drills.',
      priority: 'high',
      actionItems: [
        'Practice visual reaction drills daily',
        'Reduce stimulus complexity',
        'Focus on anticipation training'
      ]
    });
  }
  
  if (avgAccuracy < 80) {
    recommendations.push({
      category: 'accuracy',
      title: 'Enhance Accuracy',
      description: 'Your accuracy could be improved. Focus on precision over speed initially.',
      priority: 'medium',
      actionItems: [
        'Practice accuracy-focused drills',
        'Increase trial repetition',
        'Review drill instructions carefully'
      ]
    });
  }
  
  if (sessions.length < 3) {
    recommendations.push({
      category: 'consistency',
      title: 'Increase Training Frequency',
      description: 'More regular training sessions will improve your neural adaptation.',
      priority: 'medium',
      actionItems: [
        'Schedule 3-4 sessions per week',
        'Maintain consistent training times',
        'Track progress regularly'
      ]
    });
  }
  
  return recommendations;
};

// DASHBOARD STATISTICS
exports.getDashboardStats = async (req, res, next) => {
  try {
    const { athleteId } = req.params;
    const { days = 30 } = req.query;
    
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - (days * 24 * 60 * 60 * 1000));
    
    const sessions = await Session.find({
      athleteId,
      startedAt: { $gte: startDate, $lte: endDate },
      status: 'completed'
    }).populate('drillId');
    
    const stats = {
      totalSessions: sessions.length,
      totalDrills: new Set(sessions.map(s => s.drillId._id.toString())).size,
      avgReactionTime: sessions.length > 0 ? 
        Math.round(sessions.reduce((sum, s) => sum + (s.metrics.avgReactionTime || 0), 0) / sessions.length) : 0,
      avgAccuracy: sessions.length > 0 ? 
        Math.round(sessions.reduce((sum, s) => sum + (s.metrics.accuracy || 0), 0) / sessions.length) : 0,
      bestScore: sessions.length > 0 ? Math.max(...sessions.map(s => s.metrics.score || 0)) : 0,
      recentTrend: sessions.length >= 2 ? analyzePerformanceTrends(sessions).overallTrend : 'stable',
      categoryBreakdown: {}
    };
    
    // Category breakdown
    const categoryStats = {};
    sessions.forEach(session => {
      const category = session.drillId.category;
      if (!categoryStats[category]) {
        categoryStats[category] = { count: 0, avgScore: 0, totalScore: 0 };
      }
      categoryStats[category].count++;
      categoryStats[category].totalScore += session.metrics.score || 0;
    });
    
    Object.keys(categoryStats).forEach(category => {
      categoryStats[category].avgScore = Math.round(categoryStats[category].totalScore / categoryStats[category].count);
    });
    
    stats.categoryBreakdown = categoryStats;
    
    res.json(stats);
  } catch (err) {
    next(err);
  }
};


