const { MentalNeuralAnalytics } = require('../models/mentalNeuralTraining.model');
const Analytics = require('../models/Analytics');

// Middleware to automatically push mental neural training data to analytics
const pushToAnalytics = async (req, res, next) => {
  try {
    // Store original send function
    const originalSend = res.json;
    
    // Override res.json to intercept the response
    res.json = function(data) {
      // Call original send function
      originalSend.call(this, data);
      
      // If this is a session completion, push to analytics
      if (req.originalUrl.includes('/sessions/') && req.method === 'POST' && data.status === 'completed') {
        pushSessionToAnalytics(data).catch(err => {
          console.error('Error pushing session to analytics:', err);
        });
      }
    };
    
    next();
  } catch (error) {
    console.error('Analytics middleware error:', error);
    next();
  }
};

// Function to push session data to analytics
const pushSessionToAnalytics = async (sessionData) => {
  try {
    if (!sessionData || !sessionData.athleteId || !sessionData.metrics) {
      return;
    }

    const analyticsData = {
      id: `mnt-${sessionData._id}`,
      testName: sessionData.drillId?.name || 'Mental Neural Training',
      category: 'mental_neural_training',
      result: sessionData.metrics.score || 0,
      unit: 'score',
      percentile: sessionData.performance?.percentile || 50,
      date: sessionData.endedAt || new Date(),
      status: 'completed',
      notes: `Drill: ${sessionData.drillId?.name}, Reaction Time: ${sessionData.metrics.avgReactionTime}ms, Accuracy: ${sessionData.metrics.accuracy}%`
    };

    // Find existing analytics for the athlete
    const existingAnalytics = await Analytics.findOne({
      athleteId: sessionData.athleteId,
      period: 'month',
      startDate: { $lte: new Date() },
      endDate: { $gte: new Date() }
    });

    if (existingAnalytics) {
      // Update existing analytics
      const existingAssessment = existingAnalytics.assessmentResults.find(
        result => result.id === analyticsData.id
      );

      if (existingAssessment) {
        // Update existing assessment result
        existingAssessment.result = analyticsData.result;
        existingAssessment.percentile = analyticsData.percentile;
        existingAssessment.date = analyticsData.date;
        existingAssessment.notes = analyticsData.notes;
      } else {
        // Add new assessment result
        existingAnalytics.assessmentResults.push(analyticsData);
      }

      // Update summary metrics
      existingAnalytics.summary.totalAssessments += 1;
      existingAnalytics.summary.completedAssessments += 1;
      
      const allResults = existingAnalytics.assessmentResults.map(r => r.result);
      existingAnalytics.summary.averageScore = Math.round(
        allResults.reduce((sum, score) => sum + score, 0) / allResults.length
      );

      await existingAnalytics.save();
    } else {
      // Create new analytics entry
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);
      
      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(endOfMonth.getMonth() + 1);
      endOfMonth.setDate(0);
      endOfMonth.setHours(23, 59, 59, 999);

      await Analytics.create({
        athleteId: sessionData.athleteId,
        period: 'month',
        startDate: startOfMonth,
        endDate: endOfMonth,
        assessmentResults: [analyticsData],
        summary: {
          totalAssessments: 1,
          completedAssessments: 1,
          averageScore: analyticsData.result,
          improvementRate: 0,
          topPerformances: [analyticsData.testName],
          areasForImprovement: []
        },
        trends: {
          overallTrend: 'stable',
          fastestImproving: null,
          slowestImproving: null,
          consistencyScore: sessionData.metrics.consistencyScore || 0
        },
        recommendations: []
      });
    }

    console.log(`✅ Pushed mental neural training session to analytics for athlete ${sessionData.athleteId}`);
  } catch (error) {
    console.error('Error pushing session to analytics:', error);
  }
};

// Middleware to generate comprehensive analytics report
const generateAnalyticsReport = async (req, res, next) => {
  try {
    const { athleteId } = req.params;
    const { period = 'month' } = req.query;

    // Get mental neural training analytics
    const mntAnalytics = await MentalNeuralAnalytics.find({
      athleteId,
      period
    }).sort({ startDate: -1 });

    // Get general analytics
    const generalAnalytics = await Analytics.find({
      athleteId,
      period
    }).sort({ startDate: -1 });

    // Combine analytics data
    const combinedReport = {
      athleteId,
      period,
      mentalNeuralTraining: mntAnalytics,
      generalAnalytics: generalAnalytics,
      summary: {
        totalSessions: mntAnalytics.reduce((sum, a) => sum + a.metrics.sessionsCompleted, 0),
        avgReactionTime: mntAnalytics.length > 0 ? 
          Math.round(mntAnalytics.reduce((sum, a) => sum + a.metrics.avgReactionTime, 0) / mntAnalytics.length) : 0,
        avgAccuracy: mntAnalytics.length > 0 ? 
          Math.round(mntAnalytics.reduce((sum, a) => sum + a.metrics.accuracy, 0) / mntAnalytics.length) : 0,
        overallTrend: mntAnalytics.length > 0 ? mntAnalytics[0].trends.overallTrend : 'stable'
      }
    };

    // Add to response
    req.analyticsReport = combinedReport;
    next();
  } catch (error) {
    console.error('Error generating analytics report:', error);
    next();
  }
};

// Middleware to track performance metrics
const trackPerformanceMetrics = async (req, res, next) => {
  try {
    const originalSend = res.json;
    
    res.json = function(data) {
      originalSend.call(this, data);
      
      // Track performance metrics for completed sessions
      if (data && data.status === 'completed' && data.metrics) {
        trackMetrics(data).catch(err => {
          console.error('Error tracking metrics:', err);
        });
      }
    };
    
    next();
  } catch (error) {
    console.error('Performance tracking middleware error:', error);
    next();
  }
};

// Function to track performance metrics
const trackMetrics = async (sessionData) => {
  try {
    const metrics = {
      athleteId: sessionData.athleteId,
      drillId: sessionData.drillId,
      sessionId: sessionData._id,
      timestamp: new Date(),
      reactionTime: sessionData.metrics.avgReactionTime,
      accuracy: sessionData.metrics.accuracy,
      consistency: sessionData.metrics.consistencyScore,
      score: sessionData.metrics.score,
      performance: sessionData.performance
    };

    // Store metrics for trend analysis
    // This could be stored in a separate metrics collection or cache
    console.log('📊 Performance metrics tracked:', metrics);
    
  } catch (error) {
    console.error('Error tracking metrics:', error);
  }
};

module.exports = {
  pushToAnalytics,
  generateAnalyticsReport,
  trackPerformanceMetrics,
  pushSessionToAnalytics
};
