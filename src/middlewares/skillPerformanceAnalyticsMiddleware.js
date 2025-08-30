const { SkillPerformanceAnalytics } = require('../models/skillPerformanceTesting.model');
const Analytics = require('../models/Analytics');

// ============================================================================
// ANALYTICS INTEGRATION MIDDLEWARE
// ============================================================================

// Middleware to automatically push skill performance data to analytics
const pushToSkillPerformanceAnalytics = async (req, res, next) => {
  try {
    // Store original send function
    const originalSend = res.json;
    
    // Override res.json to intercept the response
    res.json = function(data) {
      // Call original send function
      originalSend.call(this, data);
      
      // If this is a test completion, push to analytics
      if (req.originalUrl.includes('/post') && req.method === 'POST' && data._id) {
        pushTestToAnalytics(data, req.originalUrl).catch(err => {
          console.error('Error pushing test to analytics:', err);
        });
      }
    };
    
    next();
  } catch (error) {
    console.error('Skill performance analytics middleware error:', error);
    next();
  }
};

// Function to push test data to analytics
const pushTestToAnalytics = async (testData, endpoint) => {
  try {
    if (!testData || !testData.athleteId) {
      return;
    }

    // Determine test category based on endpoint
    let category = 'overall';
    if (endpoint.includes('neuromuscular-readiness')) {
      category = 'neuromuscular_readiness';
    } else if (endpoint.includes('functional-fitness')) {
      category = 'functional_fitness';
    } else if (endpoint.includes('reaction-coordination')) {
      category = 'reaction_coordination';
    } else if (endpoint.includes('speed-agility')) {
      category = 'speed_agility';
    } else if (endpoint.includes('anaerobic-power')) {
      category = 'anaerobic_power';
    }

    // Find existing analytics for the athlete and category
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    endOfMonth.setHours(23, 59, 59, 999);

    let analytics = await SkillPerformanceAnalytics.findOne({
      athleteId: testData.athleteId,
      category,
      startDate: { $lte: startOfMonth },
      endDate: { $gte: endOfMonth }
    });

    if (!analytics) {
      // Create new analytics entry
      analytics = await SkillPerformanceAnalytics.create({
        athleteId: testData.athleteId,
        period: 'month',
        startDate: startOfMonth,
        endDate: endOfMonth,
        category,
        metrics: {
          totalTests: 0,
          averageScore: 0,
          improvementRate: 0,
          consistencyScore: 0,
          bestPerformance: 0,
          worstPerformance: 0
        },
        trends: {
          overallTrend: 'stable',
          fastestImproving: null,
          slowestImproving: null,
          consistencyTrend: 'stable'
        },
        recommendations: [],
        testIds: {
          dailyReadiness: [],
          obstacleCircuits: [],
          reactionTests: [],
          agilityTests: [],
          powerTests: []
        }
      });
    }

    // Update test IDs based on category
    const testIdField = getTestIdField(category);
    if (testIdField && !analytics.testIds[testIdField].includes(testData._id)) {
      analytics.testIds[testIdField].push(testData._id);
    }

    // Update metrics
    await updateAnalyticsMetrics(analytics, testData, category);
    
    // Save updated analytics
    await analytics.save();

    console.log(`✅ Pushed ${category} test to analytics for athlete ${testData.athleteId}`);

  } catch (error) {
    console.error('Error pushing test to analytics:', error);
  }
};

// Function to get the appropriate test ID field based on category
const getTestIdField = (category) => {
  const fieldMap = {
    'neuromuscular_readiness': 'dailyReadiness',
    'functional_fitness': 'obstacleCircuits',
    'reaction_coordination': 'reactionTests',
    'speed_agility': 'agilityTests',
    'anaerobic_power': 'powerTests'
  };
  return fieldMap[category] || null;
};

// Function to update analytics metrics
const updateAnalyticsMetrics = async (analytics, testData, category) => {
  try {
    // Get all tests for the athlete in the current period
    const testIds = Object.values(analytics.testIds).flat();
    
    if (testIds.length === 0) {
      return;
    }

    // Calculate metrics based on test type
    let totalTests = 0;
    let averageScore = 0;
    let bestPerformance = 0;
    let worstPerformance = 0;

    // Get test data for calculations
    const testModels = require('../models/skillPerformanceTesting.model');
    
    // Calculate metrics based on category
    switch (category) {
      case 'neuromuscular_readiness':
        const readinessTests = await testModels.DailyReadiness.find({
          _id: { $in: analytics.testIds.dailyReadiness }
        });
        if (readinessTests.length > 0) {
          const scores = readinessTests.map(t => t.readinessPercentage);
          totalTests = scores.length;
          averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
          bestPerformance = Math.max(...scores);
          worstPerformance = Math.min(...scores);
        }
        break;

      case 'reaction_coordination':
        const reactionTests = await testModels.SimpleReactionTime.find({
          _id: { $in: analytics.testIds.reactionTests }
        });
        if (reactionTests.length > 0) {
          const times = reactionTests.map(t => t.metrics.combinedAvgTime).filter(t => t);
          totalTests = times.length;
          if (times.length > 0) {
            averageScore = times.reduce((a, b) => a + b, 0) / times.length;
            bestPerformance = Math.min(...times); // Lower is better for reaction time
            worstPerformance = Math.max(...times);
          }
        }
        break;

      case 'speed_agility':
        const agilityTests = await testModels.IllinoisAgilityTest.find({
          _id: { $in: analytics.testIds.agilityTests }
        });
        if (agilityTests.length > 0) {
          const times = agilityTests.map(t => t.completionTime);
          totalTests = times.length;
          if (times.length > 0) {
            averageScore = times.reduce((a, b) => a + b, 0) / times.length;
            bestPerformance = Math.min(...times); // Lower is better for agility
            worstPerformance = Math.max(...times);
          }
        }
        break;

      case 'anaerobic_power':
        const powerTests = await testModels.VerticalJump.find({
          _id: { $in: analytics.testIds.powerTests }
        });
        if (powerTests.length > 0) {
          const heights = powerTests.map(t => t.jumpHeight);
          totalTests = heights.length;
          if (heights.length > 0) {
            averageScore = heights.reduce((a, b) => a + b, 0) / heights.length;
            bestPerformance = Math.max(...heights); // Higher is better for power
            worstPerformance = Math.min(...heights);
          }
        }
        break;

      default:
        totalTests = testIds.length;
        break;
    }

    // Update analytics metrics
    analytics.metrics.totalTests = totalTests;
    analytics.metrics.averageScore = Math.round(averageScore);
    analytics.metrics.bestPerformance = Math.round(bestPerformance);
    analytics.metrics.worstPerformance = Math.round(worstPerformance);

    // Calculate trends
    if (totalTests >= 2) {
      analytics.trends.overallTrend = calculateTrend(averageScore, bestPerformance, worstPerformance);
    }

  } catch (error) {
    console.error('Error updating analytics metrics:', error);
  }
};

// Function to calculate trend based on performance metrics
const calculateTrend = (averageScore, bestPerformance, worstPerformance) => {
  const range = bestPerformance - worstPerformance;
  const consistency = range / averageScore;
  
  if (consistency < 0.1) return 'stable';
  if (bestPerformance > averageScore * 1.1) return 'improving';
  if (worstPerformance < averageScore * 0.9) return 'declining';
  
  return 'stable';
};

// ============================================================================
// COMPREHENSIVE ANALYTICS GENERATION
// ============================================================================

// Middleware to generate comprehensive analytics report
const generateComprehensiveAnalytics = async (req, res, next) => {
  try {
    const { athleteId } = req.params;
    const { period = 'month' } = req.query;

    // Get skill performance analytics
    const skillAnalytics = await SkillPerformanceAnalytics.find({
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
      skillPerformance: skillAnalytics,
      generalAnalytics: generalAnalytics,
      summary: {
        totalSkillTests: skillAnalytics.reduce((sum, a) => sum + a.metrics.totalTests, 0),
        categories: skillAnalytics.map(a => a.category),
        overallTrend: skillAnalytics.length > 0 ? skillAnalytics[0].trends.overallTrend : 'stable'
      }
    };

    // Add to response
    req.comprehensiveAnalytics = combinedReport;
    next();
  } catch (error) {
    console.error('Error generating comprehensive analytics:', error);
    next();
  }
};

// ============================================================================
// PERFORMANCE TRACKING MIDDLEWARE
// ============================================================================

// Middleware to track performance metrics
const trackPerformanceMetrics = async (req, res, next) => {
  try {
    const originalSend = res.json;
    
    res.json = function(data) {
      originalSend.call(this, data);
      
      // Track performance metrics for completed tests
      if (data && data._id && data.performance) {
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
const trackMetrics = async (testData) => {
  try {
    const metrics = {
      athleteId: testData.athleteId,
      testId: testData._id,
      testType: testData.constructor.modelName,
      timestamp: new Date(),
      performance: testData.performance,
      category: determineTestCategory(testData)
    };

    // Store metrics for trend analysis
    console.log('📊 Performance metrics tracked:', metrics);
    
  } catch (error) {
    console.error('Error tracking metrics:', error);
  }
};

// Function to determine test category
const determineTestCategory = (testData) => {
  const modelName = testData.constructor.modelName;
  
  if (['DailyReadiness'].includes(modelName)) return 'neuromuscular_readiness';
  if (['CustomObstacleCircuit', 'IOCT'].includes(modelName)) return 'functional_fitness';
  if (['SimpleReactionTime', 'VestibuloOcularReflex', 'HReflex', 'DTR'].includes(modelName)) return 'reaction_coordination';
  if (['MaxRunupSpeed', 'YoYoIR', 'IllinoisAgilityTest', 'Agility505', 'TTest', 'TimingGates'].includes(modelName)) return 'speed_agility';
  if (['VerticalJump', 'BroadJump', 'TimeToPeakForce', 'WingateAnaerobicTest', 'FlightTest'].includes(modelName)) return 'anaerobic_power';
  
  return 'overall';
};

// ============================================================================
// RECOMMENDATIONS ENGINE
// ============================================================================

// Function to generate recommendations based on performance data
const generateRecommendations = async (athleteId, category) => {
  try {
    const analytics = await SkillPerformanceAnalytics.findOne({
      athleteId,
      category
    }).sort({ startDate: -1 });

    if (!analytics) {
      return [];
    }

    const recommendations = [];
    const { metrics, trends } = analytics;

    // Performance-based recommendations
    if (metrics.averageScore < 70) {
      recommendations.push({
        category: 'performance',
        title: 'Improve Overall Performance',
        description: `Your average ${category.replace('_', ' ')} score is below optimal levels.`,
        priority: 'high',
        actionItems: [
          'Focus on consistent training',
          'Review test preparation',
          'Consult with coach for technique improvement'
        ]
      });
    }

    // Consistency-based recommendations
    if (metrics.consistencyScore < 60) {
      recommendations.push({
        category: 'consistency',
        title: 'Improve Performance Consistency',
        description: 'Your performance shows high variability between tests.',
        priority: 'medium',
        actionItems: [
          'Maintain regular training schedule',
          'Focus on technique consistency',
          'Monitor recovery and readiness'
        ]
      });
    }

    // Frequency-based recommendations
    if (metrics.totalTests < 3) {
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

    // Trend-based recommendations
    if (trends.overallTrend === 'declining') {
      recommendations.push({
        category: 'trend',
        title: 'Address Performance Decline',
        description: 'Your performance trend shows recent decline.',
        priority: 'high',
        actionItems: [
          'Review recent training load',
          'Check for overtraining signs',
          'Adjust training intensity',
          'Focus on recovery'
        ]
      });
    }

    return recommendations;

  } catch (error) {
    console.error('Error generating recommendations:', error);
    return [];
  }
};

// ============================================================================
// EXPORT MIDDLEWARE FUNCTIONS
// ============================================================================

module.exports = {
  pushToSkillPerformanceAnalytics,
  generateComprehensiveAnalytics,
  trackPerformanceMetrics,
  generateRecommendations,
  pushTestToAnalytics,
  updateAnalyticsMetrics
};
