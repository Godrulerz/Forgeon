const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:3000/api/skill-performance-testing';
const ATHLETE_ID = 'athlete_001';
const COACH_ID = 'coach_001';

// Test data
const testData = {
  dailyReadiness: {
    athleteId: ATHLETE_ID,
    scores: {
      sleepQuality: 4,
      fatigue: 3,
      muscleSoreness: 4,
      stressLevels: 3,
      mood: 4
    },
    notes: 'Good recovery day'
  },
  
  customObstacleCircuit: {
    athleteId: ATHLETE_ID,
    testName: 'Military Obstacle Course',
    obstacles: [
      { name: 'Wall Climb', time: 8.5, penalties: 0, penaltyTime: 5 },
      { name: 'Rope Climb', time: 12.3, penalties: 1, penaltyTime: 5 },
      { name: 'Balance Beam', time: 6.2, penalties: 0, penaltyTime: 5 },
      { name: 'Cargo Net', time: 15.1, penalties: 2, penaltyTime: 5 }
    ],
    cutoffTime: 60,
    notes: 'Standard military fitness test'
  },
  
  reactionTime: {
    athleteId: ATHLETE_ID,
    lightTrials: [245, 198, 267, 189, 234],
    soundTrials: [278, 245, 289, 267, 256],
    notes: 'Light vs Sound reaction time comparison'
  },
  
  illinoisAgility: {
    athleteId: ATHLETE_ID,
    completionTime: 16.8,
    gender: 'male',
    notes: 'Good agility performance'
  },
  
  verticalJump: {
    athleteId: ATHLETE_ID,
    jumpHeight: 65,
    athleteWeight: 75,
    notes: 'Power assessment'
  },
  
  wingateTest: {
    athleteId: ATHLETE_ID,
    peakPower: 850,
    meanPower: 720,
    fatigueIndex: 15.3,
    athleteWeight: 75,
    notes: 'Anaerobic capacity test'
  }
};

// ============================================================================
// TEST FUNCTIONS
// ============================================================================

const testHealthCheck = async () => {
  try {
    console.log('\n🏥 Testing Health Check...');
    const response = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health Check:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Health Check Failed:', error.response?.data || error.message);
    return false;
  }
};

const testNeuromuscularReadiness = async () => {
  try {
    console.log('\n🧠 Testing Neuromuscular Readiness...');
    
    // Create daily readiness assessment
    const createResponse = await axios.post(
      `${BASE_URL}/neuromuscular-readiness/daily-readiness`,
      testData.dailyReadiness
    );
    console.log('✅ Daily Readiness Created:', createResponse.data._id);
    
    // Execute daily readiness (Python integration)
    const executeResponse = await axios.post(
      `${BASE_URL}/neuromuscular-readiness/execute-daily-readiness`,
      { athleteId: ATHLETE_ID }
    );
    console.log('✅ Daily Readiness Executed:', executeResponse.data.message);
    
    // Get daily readiness data
    const getResponse = await axios.get(
      `${BASE_URL}/neuromuscular-readiness/daily-readiness/${ATHLETE_ID}?days=30`
    );
    console.log('✅ Daily Readiness Retrieved:', getResponse.data.length, 'records');
    
    return true;
  } catch (error) {
    console.error('❌ Neuromuscular Readiness Test Failed:', error.response?.data || error.message);
    return false;
  }
};

const testFunctionalFitness = async () => {
  try {
    console.log('\n💪 Testing Functional Fitness...');
    
    // Create custom obstacle circuit
    const createResponse = await axios.post(
      `${BASE_URL}/functional-fitness/custom-obstacle-circuit`,
      testData.customObstacleCircuit
    );
    console.log('✅ Obstacle Circuit Created:', createResponse.data._id);
    
    // Execute obstacle circuit (Python integration)
    const executeResponse = await axios.post(
      `${BASE_URL}/functional-fitness/execute-obstacle-circuit`,
      {
        athleteId: ATHLETE_ID,
        obstacles: testData.customObstacleCircuit.obstacles,
        cutoffTime: testData.customObstacleCircuit.cutoffTime
      }
    );
    console.log('✅ Obstacle Circuit Executed:', executeResponse.data.message);
    
    // Create IOCT
    const ioctResponse = await axios.post(
      `${BASE_URL}/functional-fitness/ioct`,
      {
        athleteId: ATHLETE_ID,
        completionTime: 45.2,
        penalties: 2,
        notes: 'Individual obstacle course test'
      }
    );
    console.log('✅ IOCT Created:', ioctResponse.data._id);
    
    return true;
  } catch (error) {
    console.error('❌ Functional Fitness Test Failed:', error.response?.data || error.message);
    return false;
  }
};

const testReactionCoordination = async () => {
  try {
    console.log('\n⚡ Testing Reaction, Coordination & Reflex...');
    
    // Create simple reaction time test
    const createResponse = await axios.post(
      `${BASE_URL}/reaction-coordination/simple-reaction-time`,
      { athleteId: ATHLETE_ID }
    );
    console.log('✅ Reaction Time Created:', createResponse.data._id);
    
    // Execute reaction time test (Python integration)
    const executeResponse = await axios.post(
      `${BASE_URL}/reaction-coordination/execute-reaction-time`,
      {
        athleteId: ATHLETE_ID,
        lightTrials: testData.reactionTime.lightTrials,
        soundTrials: testData.reactionTime.soundTrials
      }
    );
    console.log('✅ Reaction Time Executed:', executeResponse.data.message);
    
    // Create Vestibulo-Ocular Reflex test
    const vorResponse = await axios.post(
      `${BASE_URL}/reaction-coordination/vestibulo-ocular-reflex`,
      {
        athleteId: ATHLETE_ID,
        headVelocity: 120,
        eyeVelocity: 108,
        asymmetry: 5.2,
        notes: 'VOR assessment'
      }
    );
    console.log('✅ VOR Test Created:', vorResponse.data._id);
    
    // Create H-Reflex test
    const hReflexResponse = await axios.post(
      `${BASE_URL}/reaction-coordination/h-reflex`,
      {
        athleteId: ATHLETE_ID,
        hReflexAmplitude: 2.8,
        mWaveAmplitude: 8.5,
        notes: 'H-reflex assessment'
      }
    );
    console.log('✅ H-Reflex Test Created:', hReflexResponse.data._id);
    
    // Create DTR test
    const dtrResponse = await axios.post(
      `${BASE_URL}/reaction-coordination/dtr`,
      {
        athleteId: ATHLETE_ID,
        reflexes: [
          { name: 'Patellar', score: 3, side: 'left' },
          { name: 'Patellar', score: 3, side: 'right' },
          { name: 'Achilles', score: 2, side: 'left' },
          { name: 'Achilles', score: 2, side: 'right' }
        ],
        notes: 'Deep tendon reflexes assessment'
      }
    );
    console.log('✅ DTR Test Created:', dtrResponse.data._id);
    
    return true;
  } catch (error) {
    console.error('❌ Reaction Coordination Test Failed:', error.response?.data || error.message);
    return false;
  }
};

const testSpeedAgility = async () => {
  try {
    console.log('\n🏃 Testing Speed, Acceleration & Agility...');
    
    // Create Max Run-up Speed test
    const maxSpeedResponse = await axios.post(
      `${BASE_URL}/speed-agility/max-runup-speed`,
      {
        athleteId: ATHLETE_ID,
        distance: 30,
        time: 3.8,
        notes: '30m sprint test'
      }
    );
    console.log('✅ Max Run-up Speed Created:', maxSpeedResponse.data._id);
    
    // Create Yo-Yo IR test
    const yoYoResponse = await axios.post(
      `${BASE_URL}/speed-agility/yo-yo-ir`,
      {
        athleteId: ATHLETE_ID,
        level: 18,
        shuttles: 12,
        totalDistance: 1440,
        notes: 'Yo-Yo intermittent recovery test'
      }
    );
    console.log('✅ Yo-Yo IR Created:', yoYoResponse.data._id);
    
    // Create Illinois Agility Test
    const illinoisResponse = await axios.post(
      `${BASE_URL}/speed-agility/illinois-agility-test`,
      testData.illinoisAgility
    );
    console.log('✅ Illinois Agility Test Created:', illinoisResponse.data._id);
    
    // Execute Illinois Agility Test (Python integration)
    const executeResponse = await axios.post(
      `${BASE_URL}/speed-agility/execute-illinois-agility-test`,
      {
        athleteId: ATHLETE_ID,
        completionTime: testData.illinoisAgility.completionTime,
        gender: testData.illinoisAgility.gender
      }
    );
    console.log('✅ Illinois Agility Test Executed:', executeResponse.data.message);
    
    // Create 505 Agility Test
    const agility505Response = await axios.post(
      `${BASE_URL}/speed-agility/505-agility`,
      {
        athleteId: ATHLETE_ID,
        completionTime: 2.8,
        direction: 'left',
        notes: '505 agility test - left direction'
      }
    );
    console.log('✅ 505 Agility Test Created:', agility505Response.data._id);
    
    // Create T-Test
    const tTestResponse = await axios.post(
      `${BASE_URL}/speed-agility/t-test`,
      {
        athleteId: ATHLETE_ID,
        completionTime: 11.2,
        notes: 'T-test agility assessment'
      }
    );
    console.log('✅ T-Test Created:', tTestResponse.data._id);
    
    // Create Timing Gates test
    const timingGatesResponse = await axios.post(
      `${BASE_URL}/speed-agility/timing-gates`,
      {
        athleteId: ATHLETE_ID,
        distances: [
          { gate: '10m', time: 1.8 },
          { gate: '20m', time: 3.2 },
          { gate: '30m', time: 4.5 }
        ],
        notes: 'Split time analysis'
      }
    );
    console.log('✅ Timing Gates Created:', timingGatesResponse.data._id);
    
    return true;
  } catch (error) {
    console.error('❌ Speed Agility Test Failed:', error.response?.data || error.message);
    return false;
  }
};

const testAnaerobicPower = async () => {
  try {
    console.log('\n💥 Testing Anaerobic & Power...');
    
    // Create Vertical Jump test
    const verticalJumpResponse = await axios.post(
      `${BASE_URL}/anaerobic-power/vertical-jump`,
      testData.verticalJump
    );
    console.log('✅ Vertical Jump Created:', verticalJumpResponse.data._id);
    
    // Create Broad Jump test
    const broadJumpResponse = await axios.post(
      `${BASE_URL}/anaerobic-power/broad-jump`,
      {
        athleteId: ATHLETE_ID,
        jumpDistance: 245,
        athleteWeight: 75,
        notes: 'Standing long jump'
      }
    );
    console.log('✅ Broad Jump Created:', broadJumpResponse.data._id);
    
    // Create Time to Peak Force test
    const timeToPeakResponse = await axios.post(
      `${BASE_URL}/anaerobic-power/time-to-peak-force`,
      {
        athleteId: ATHLETE_ID,
        timeToPeak: 180,
        peakForce: 1200,
        notes: 'Rate of force development'
      }
    );
    console.log('✅ Time to Peak Force Created:', timeToPeakResponse.data._id);
    
    // Create Wingate Anaerobic Test
    const wingateResponse = await axios.post(
      `${BASE_URL}/anaerobic-power/wingate-anaerobic-test`,
      testData.wingateTest
    );
    console.log('✅ Wingate Test Created:', wingateResponse.data._id);
    
    // Create Flight Test
    const flightTestResponse = await axios.post(
      `${BASE_URL}/anaerobic-power/flight-test`,
      {
        athleteId: ATHLETE_ID,
        flightTime: 0.45,
        jumpHeight: 65,
        athleteWeight: 75,
        notes: 'Flight time analysis'
      }
    );
    console.log('✅ Flight Test Created:', flightTestResponse.data._id);
    
    return true;
  } catch (error) {
    console.error('❌ Anaerobic Power Test Failed:', error.response?.data || error.message);
    return false;
  }
};

const testAnalytics = async () => {
  try {
    console.log('\n📊 Testing Analytics & Dashboard...');
    
    // Generate comprehensive analytics
    const generateResponse = await axios.post(
      `${BASE_URL}/analytics/generate`,
      {
        athleteId: ATHLETE_ID,
        period: 'month',
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date().toISOString(),
        category: 'overall'
      }
    );
    console.log('✅ Analytics Generated:', generateResponse.data._id);
    
    // Get analytics for athlete
    const getAnalyticsResponse = await axios.get(
      `${BASE_URL}/analytics/${ATHLETE_ID}?period=month`
    );
    console.log('✅ Analytics Retrieved:', getAnalyticsResponse.data.length, 'records');
    
    // Get dashboard statistics
    const dashboardResponse = await axios.get(
      `${BASE_URL}/dashboard/${ATHLETE_ID}?days=30`
    );
    console.log('✅ Dashboard Stats Retrieved:', dashboardResponse.data.totalTests, 'total tests');
    
    // Get all tests for athlete
    const allTestsResponse = await axios.get(
      `${BASE_URL}/athlete/${ATHLETE_ID}/all-tests?days=30`
    );
    console.log('✅ All Tests Retrieved:', allTestsResponse.data.summary.totalTests, 'tests');
    
    return true;
  } catch (error) {
    console.error('❌ Analytics Test Failed:', error.response?.data || error.message);
    return false;
  }
};

const testCRUDOperations = async () => {
  try {
    console.log('\n🔄 Testing CRUD Operations...');
    
    // Test Vertical Jump CRUD
    const createResponse = await axios.post(
      `${BASE_URL}/anaerobic-power/vertical-jump`,
      {
        athleteId: ATHLETE_ID,
        jumpHeight: 70,
        athleteWeight: 75,
        notes: 'CRUD test'
      }
    );
    const testId = createResponse.data._id;
    console.log('✅ Created:', testId);
    
    // Get by ID
    const getResponse = await axios.get(`${BASE_URL}/anaerobic-power/vertical-jump/${testId}`);
    console.log('✅ Retrieved:', getResponse.data._id);
    
    // Update
    const updateResponse = await axios.put(
      `${BASE_URL}/anaerobic-power/vertical-jump/${testId}`,
      { notes: 'Updated CRUD test' }
    );
    console.log('✅ Updated:', updateResponse.data.notes);
    
    // Delete
    const deleteResponse = await axios.delete(`${BASE_URL}/anaerobic-power/vertical-jump/${testId}`);
    console.log('✅ Deleted:', deleteResponse.data.message);
    
    return true;
  } catch (error) {
    console.error('❌ CRUD Operations Test Failed:', error.response?.data || error.message);
    return false;
  }
};

// ============================================================================
// MAIN TEST EXECUTION
// ============================================================================

const runAllTests = async () => {
  console.log('🚀 Starting Skill Performance Testing API Tests...\n');
  
  const tests = [
    { name: 'Health Check', fn: testHealthCheck },
    { name: 'Neuromuscular Readiness', fn: testNeuromuscularReadiness },
    { name: 'Functional Fitness', fn: testFunctionalFitness },
    { name: 'Reaction Coordination', fn: testReactionCoordination },
    { name: 'Speed Agility', fn: testSpeedAgility },
    { name: 'Anaerobic Power', fn: testAnaerobicPower },
    { name: 'Analytics', fn: testAnalytics },
    { name: 'CRUD Operations', fn: testCRUDOperations }
  ];
  
  const results = [];
  
  for (const test of tests) {
    try {
      const success = await test.fn();
      results.push({ name: test.name, status: success ? 'PASS' : 'FAIL' });
    } catch (error) {
      console.error(`❌ ${test.name} Test Error:`, error.message);
      results.push({ name: test.name, status: 'ERROR' });
    }
  }
  
  // Summary
  console.log('\n📋 Test Summary:');
  console.log('================');
  results.forEach(result => {
    const icon = result.status === 'PASS' ? '✅' : result.status === 'FAIL' ? '❌' : '⚠️';
    console.log(`${icon} ${result.name}: ${result.status}`);
  });
  
  const passed = results.filter(r => r.status === 'PASS').length;
  const total = results.length;
  
  console.log(`\n🎯 Overall Result: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('🎉 All tests passed! The Skill Performance Testing API is working correctly.');
  } else {
    console.log('⚠️ Some tests failed. Please check the error messages above.');
  }
};

// ============================================================================
// POSTMAN TESTING GUIDE
// ============================================================================

const generatePostmanGuide = () => {
  console.log('\n📖 POSTMAN TESTING GUIDE');
  console.log('========================');
  console.log('\nImport these requests into Postman to test the APIs manually:');
  
  const requests = [
    {
      method: 'GET',
      url: `${BASE_URL}/health`,
      description: 'Health Check - Verify API is running'
    },
    {
      method: 'POST',
      url: `${BASE_URL}/neuromuscular-readiness/daily-readiness`,
      body: testData.dailyReadiness,
      description: 'Create Daily Readiness Assessment'
    },
    {
      method: 'POST',
      url: `${BASE_URL}/functional-fitness/execute-obstacle-circuit`,
      body: {
        athleteId: ATHLETE_ID,
        obstacles: testData.customObstacleCircuit.obstacles,
        cutoffTime: testData.customObstacleCircuit.cutoffTime
      },
      description: 'Execute Obstacle Circuit (Python Integration)'
    },
    {
      method: 'POST',
      url: `${BASE_URL}/reaction-coordination/execute-reaction-time`,
      body: {
        athleteId: ATHLETE_ID,
        lightTrials: testData.reactionTime.lightTrials,
        soundTrials: testData.reactionTime.soundTrials
      },
      description: 'Execute Reaction Time Test (Python Integration)'
    },
    {
      method: 'POST',
      url: `${BASE_URL}/speed-agility/execute-illinois-agility-test`,
      body: {
        athleteId: ATHLETE_ID,
        completionTime: testData.illinoisAgility.completionTime,
        gender: testData.illinoisAgility.gender
      },
      description: 'Execute Illinois Agility Test (Python Integration)'
    },
    {
      method: 'POST',
      url: `${BASE_URL}/anaerobic-power/vertical-jump`,
      body: testData.verticalJump,
      description: 'Create Vertical Jump Test'
    },
    {
      method: 'POST',
      url: `${BASE_URL}/analytics/generate`,
      body: {
        athleteId: ATHLETE_ID,
        period: 'month',
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date().toISOString(),
        category: 'overall'
      },
      description: 'Generate Comprehensive Analytics'
    },
    {
      method: 'GET',
      url: `${BASE_URL}/dashboard/${ATHLETE_ID}?days=30`,
      description: 'Get Dashboard Statistics'
    }
  ];
  
  requests.forEach((req, index) => {
    console.log(`\n${index + 1}. ${req.method} ${req.url}`);
    console.log(`   Description: ${req.description}`);
    if (req.body) {
      console.log(`   Body: ${JSON.stringify(req.body, null, 2)}`);
    }
  });
};

// ============================================================================
// EXECUTION
// ============================================================================

if (require.main === module) {
  // Run tests if script is executed directly
  runAllTests().then(() => {
    generatePostmanGuide();
  }).catch(error => {
    console.error('❌ Test execution failed:', error);
  });
}

module.exports = {
  runAllTests,
  generatePostmanGuide,
  testData
};
