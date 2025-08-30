const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:3000/api/mental-neural-training';
const AUTH_TOKEN = 'your-auth-token-here'; // Replace with actual token

// Axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${AUTH_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

// Test data
const testDrill = {
  name: 'Test Reaction Drill',
  category: 'reaction',
  description: 'A test reaction time drill for API testing',
  difficulty: 'intermediate',
  estimatedDuration: 240,
  equipmentRequired: ['computer', 'keyboard'],
  instructions: 'Press the spacebar as quickly as possible when the screen changes color',
  config: {
    duration: 240,
    trials: 8,
    restBetweenTrials: 4,
    difficulty: 'intermediate',
    audioEnabled: false,
    visualCues: true,
    stimulusDelay: 1500,
    responseTimeout: 1500,
    targetAccuracy: 85,
    targetReactionTime: 400
  },
  tags: ['reaction', 'test', 'intermediate']
};

const testSession = {
  athleteId: 'athlete-1',
  coachId: 'coach-1',
  status: 'scheduled'
};

const testResults = [
  {
    trial: 1,
    reactionTime: 450,
    accuracy: true,
    timestamp: new Date().toISOString(),
    stimulusType: 'visual',
    responseType: 'correct',
    difficulty: 'medium'
  },
  {
    trial: 2,
    reactionTime: 380,
    accuracy: true,
    timestamp: new Date().toISOString(),
    stimulusType: 'visual',
    responseType: 'correct',
    difficulty: 'medium'
  },
  {
    trial: 3,
    reactionTime: 520,
    accuracy: false,
    timestamp: new Date().toISOString(),
    stimulusType: 'visual',
    responseType: 'incorrect',
    difficulty: 'medium'
  },
  {
    trial: 4,
    reactionTime: 410,
    accuracy: true,
    timestamp: new Date().toISOString(),
    stimulusType: 'visual',
    responseType: 'correct',
    difficulty: 'medium'
  },
  {
    trial: 5,
    reactionTime: 390,
    accuracy: true,
    timestamp: new Date().toISOString(),
    stimulusType: 'visual',
    responseType: 'correct',
    difficulty: 'medium'
  }
];

// Test functions
async function testDrills() {
  console.log('\n🧪 Testing Drills API...');
  
  try {
    // 1. Create a drill
    console.log('1. Creating a new drill...');
    const createResponse = await api.post('/drills', testDrill);
    const drillId = createResponse.data._id;
    console.log('✅ Drill created:', createResponse.data.name);
    
    // 2. Get all drills
    console.log('\n2. Getting all drills...');
    const listResponse = await api.get('/drills');
    console.log(`✅ Found ${listResponse.data.length} drills`);
    
    // 3. Get specific drill
    console.log('\n3. Getting specific drill...');
    const getResponse = await api.get(`/drills/${drillId}`);
    console.log('✅ Drill retrieved:', getResponse.data.name);
    
    // 4. Update drill
    console.log('\n4. Updating drill...');
    const updateData = { ...testDrill, description: 'Updated description for testing' };
    const updateResponse = await api.put(`/drills/${drillId}`, updateData);
    console.log('✅ Drill updated:', updateResponse.data.description);
    
    return drillId;
  } catch (error) {
    console.error('❌ Error testing drills:', error.response?.data || error.message);
    throw error;
  }
}

async function testSessions(drillId) {
  console.log('\n🧪 Testing Sessions API...');
  
  try {
    // 1. Create a session
    console.log('1. Creating a new session...');
    const sessionData = { ...testSession, drillId };
    const createResponse = await api.post('/sessions', sessionData);
    const sessionId = createResponse.data._id;
    console.log('✅ Session created:', sessionId);
    
    // 2. Get all sessions
    console.log('\n2. Getting all sessions...');
    const listResponse = await api.get('/sessions');
    console.log(`✅ Found ${listResponse.data.length} sessions`);
    
    // 3. Get specific session
    console.log('\n3. Getting specific session...');
    const getResponse = await api.get(`/sessions/${sessionId}`);
    console.log('✅ Session retrieved:', getResponse.data.status);
    
    // 4. Start session
    console.log('\n4. Starting session...');
    const startResponse = await api.post(`/sessions/${sessionId}/start`);
    console.log('✅ Session started:', startResponse.data.status);
    
    // 5. Complete session with results
    console.log('\n5. Completing session with results...');
    const completeResponse = await api.post(`/sessions/${sessionId}/complete`, {
      results: testResults
    });
    console.log('✅ Session completed with metrics:', {
      avgReactionTime: completeResponse.data.metrics.avgReactionTime,
      accuracy: completeResponse.data.metrics.accuracy,
      score: completeResponse.data.metrics.score
    });
    
    return sessionId;
  } catch (error) {
    console.error('❌ Error testing sessions:', error.response?.data || error.message);
    throw error;
  }
}

async function testPythonIntegration(drillId) {
  console.log('\n🧪 Testing Python Script Integration...');
  
  try {
    // Execute drill with Python script
    console.log('1. Executing drill with Python script...');
    const executeResponse = await api.post('/execute-drill', {
      drillId,
      athleteId: 'athlete-1',
      duration: 30
    });
    
    console.log('✅ Python script executed successfully');
    console.log('📊 Session metrics:', {
      avgReactionTime: executeResponse.data.session.metrics.avgReactionTime,
      accuracy: executeResponse.data.session.metrics.accuracy,
      score: executeResponse.data.session.metrics.score
    });
    
    console.log('🐍 Python output preview:', executeResponse.data.pythonOutput.substring(0, 100) + '...');
    
    return executeResponse.data.session._id;
  } catch (error) {
    console.error('❌ Error testing Python integration:', error.response?.data || error.message);
    console.log('Note: This test requires the Python script to be available and executable');
    return null;
  }
}

async function testAnalytics(athleteId) {
  console.log('\n🧪 Testing Analytics API...');
  
  try {
    // 1. Get athlete analytics
    console.log('1. Getting athlete analytics...');
    const analyticsResponse = await api.get(`/analytics/athlete/${athleteId}?period=month`);
    console.log(`✅ Found ${analyticsResponse.data.length} analytics records`);
    
    // 2. Get performance trends
    console.log('\n2. Getting performance trends...');
    const trendsResponse = await api.get(`/analytics/trends/${athleteId}?days=30`);
    console.log('✅ Performance trends:', trendsResponse.data);
    
    // 3. Generate comprehensive analytics
    console.log('\n3. Generating comprehensive analytics...');
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    const generateResponse = await api.post('/analytics/generate', {
      athleteId,
      period: 'month',
      startDate: startDate.toISOString(),
      endDate: new Date().toISOString()
    });
    console.log('✅ Analytics generated:', generateResponse.data.metrics);
    
    // 4. Get comprehensive report
    console.log('\n4. Getting comprehensive analytics report...');
    const reportResponse = await api.get(`/analytics/report/${athleteId}?period=month`);
    console.log('✅ Comprehensive report generated:', {
      totalSessions: reportResponse.data.summary.totalSessions,
      avgReactionTime: reportResponse.data.summary.avgReactionTime,
      overallTrend: reportResponse.data.summary.overallTrend
    });
    
  } catch (error) {
    console.error('❌ Error testing analytics:', error.response?.data || error.message);
  }
}

async function testDashboard(athleteId) {
  console.log('\n🧪 Testing Dashboard API...');
  
  try {
    // Get dashboard statistics
    console.log('1. Getting dashboard statistics...');
    const dashboardResponse = await api.get(`/dashboard/${athleteId}?days=30`);
    console.log('✅ Dashboard statistics:', {
      totalSessions: dashboardResponse.data.totalSessions,
      totalDrills: dashboardResponse.data.totalDrills,
      avgReactionTime: dashboardResponse.data.avgReactionTime,
      avgAccuracy: dashboardResponse.data.avgAccuracy,
      bestScore: dashboardResponse.data.bestScore,
      recentTrend: dashboardResponse.data.recentTrend
    });
    
    if (dashboardResponse.data.categoryBreakdown) {
      console.log('📊 Category breakdown:', dashboardResponse.data.categoryBreakdown);
    }
    
  } catch (error) {
    console.error('❌ Error testing dashboard:', error.response?.data || error.message);
  }
}

async function cleanup(drillId) {
  console.log('\n🧹 Cleaning up test data...');
  
  try {
    // Delete the test drill (soft delete)
    if (drillId) {
      await api.delete(`/drills/${drillId}`);
      console.log('✅ Test drill deactivated');
    }
    
    console.log('✅ Cleanup completed');
  } catch (error) {
    console.error('❌ Error during cleanup:', error.response?.data || error.message);
  }
}

// Main test function
async function runTests() {
  console.log('🚀 Starting Mental Neural Training API Tests...');
  console.log('=' .repeat(60));
  
  let drillId = null;
  let sessionId = null;
  
  try {
    // Test drills
    drillId = await testDrills();
    
    // Test sessions
    sessionId = await testSessions(drillId);
    
    // Test Python integration
    await testPythonIntegration(drillId);
    
    // Test analytics
    await testAnalytics('athlete-1');
    
    // Test dashboard
    await testDashboard('athlete-1');
    
    console.log('\n🎉 All tests completed successfully!');
    
  } catch (error) {
    console.error('\n💥 Test suite failed:', error.message);
  } finally {
    // Cleanup
    await cleanup(drillId);
  }
}

// Example API usage functions
async function exampleWorkflow() {
  console.log('\n📚 Example Complete Workflow...');
  console.log('=' .repeat(60));
  
  try {
    // 1. Create a drill
    console.log('1. Creating a custom reaction drill...');
    const customDrill = {
      name: 'Custom Dual-Task Test',
      category: 'dual_task',
      description: 'Advanced dual-task processing test',
      difficulty: 'advanced',
      estimatedDuration: 360,
      equipmentRequired: ['computer', 'keyboard', 'headphones'],
      instructions: 'Respond to both visual and auditory stimuli simultaneously',
      config: {
        duration: 360,
        trials: 12,
        restBetweenTrials: 5,
        difficulty: 'advanced',
        audioEnabled: true,
        visualCues: true,
        stimulusDelay: 1000,
        responseTimeout: 1000,
        targetAccuracy: 75,
        targetReactionTime: 600
      },
      tags: ['dual_task', 'advanced', 'cognitive']
    };
    
    const drillResponse = await api.post('/drills', customDrill);
    const drillId = drillResponse.data._id;
    console.log('✅ Custom drill created:', drillResponse.data.name);
    
    // 2. Create and execute a session
    console.log('\n2. Creating and executing a session...');
    const sessionResponse = await api.post('/sessions', {
      athleteId: 'athlete-1',
      drillId,
      coachId: 'coach-1',
      status: 'scheduled'
    });
    
    const sessionId = sessionResponse.data._id;
    
    // Start the session
    await api.post(`/sessions/${sessionId}/start`);
    
    // Complete with realistic results
    const realisticResults = Array.from({ length: 12 }, (_, i) => ({
      trial: i + 1,
      reactionTime: 500 + Math.random() * 200, // 500-700ms
      accuracy: Math.random() > 0.2, // 80% accuracy
      timestamp: new Date(Date.now() + i * 5000).toISOString(),
      stimulusType: 'visual',
      responseType: Math.random() > 0.2 ? 'correct' : 'incorrect',
      difficulty: 'advanced'
    }));
    
    const completeResponse = await api.post(`/sessions/${sessionId}/complete`, {
      results: realisticResults
    });
    
    console.log('✅ Session completed with realistic results');
    console.log('📊 Performance metrics:', {
      avgReactionTime: completeResponse.data.metrics.avgReactionTime,
      accuracy: completeResponse.data.metrics.accuracy,
      consistencyScore: completeResponse.data.metrics.consistencyScore,
      overallScore: completeResponse.data.metrics.score,
      performanceRating: completeResponse.data.performance.rating
    });
    
    // 3. Generate analytics
    console.log('\n3. Generating analytics...');
    const analyticsResponse = await api.post('/analytics/generate', {
      athleteId: 'athlete-1',
      period: 'month',
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date().toISOString()
    });
    
    console.log('✅ Analytics generated');
    console.log('📈 Trends:', analyticsResponse.data.trends);
    console.log('💡 Recommendations:', analyticsResponse.data.recommendations.length);
    
    // 4. Get comprehensive report
    console.log('\n4. Getting comprehensive report...');
    const reportResponse = await api.get(`/analytics/report/athlete-1?period=month`);
    
    console.log('✅ Comprehensive report generated');
    console.log('📊 Summary:', reportResponse.data.summary);
    
    // Cleanup
    await api.delete(`/drills/${drillId}`);
    console.log('\n✅ Example workflow completed and cleaned up');
    
  } catch (error) {
    console.error('❌ Example workflow failed:', error.response?.data || error.message);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests()
    .then(() => {
      console.log('\n🏁 Test execution finished');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Test execution failed:', error);
      process.exit(1);
    });
}

// Export functions for use in other modules
module.exports = {
  testDrills,
  testSessions,
  testPythonIntegration,
  testAnalytics,
  testDashboard,
  exampleWorkflow,
  runTests
};
