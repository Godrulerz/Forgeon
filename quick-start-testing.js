#!/usr/bin/env node

/**
 *  ForgeOn Backend API - Quick Start Testing Script
 * 
 * This script helps you quickly test all API endpoints
 * Run this after starting your backend server
 */

const axios = require('axios');

// Configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const ATHLETE_ID = process.env.ATHLETE_ID || '507f1f77bcf86cd799439011';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Test results tracking
let passedTests = 0;
let failedTests = 0;
let totalTests = 0;

// Helper function to log test results
function logTest(name, success, details = '') {
  totalTests++;
  if (success) {
    passedTests++;
    console.log(`${colors.green}✅ PASS${colors.reset} ${name}`);
  } else {
    failedTests++;
    console.log(`${colors.red}❌ FAIL${colors.reset} ${name}`);
    if (details) {
      console.log(`   ${colors.yellow}Details:${colors.reset} ${details}`);
    }
  }
}

// Helper function to make API calls
async function testAPI(name, method, endpoint, data = null, expectedStatus = 200) {
  try {
    const config = {
      method: method.toLowerCase(),
      url: `${BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (data && ['post', 'put', 'patch'].includes(method.toLowerCase())) {
      config.data = data;
    }

    const response = await axios(config);
    
    if (response.status === expectedStatus) {
      logTest(name, true);
      return response.data;
    } else {
      logTest(name, false, `Expected ${expectedStatus}, got ${response.status}`);
      return null;
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    logTest(name, false, errorMessage);
    return null;
  }
}

// Main testing function
async function runAllTests() {
  console.log(`${colors.bright}${colors.blue} ForgeOn Backend API Testing${colors.reset}\n`);
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Athlete ID: ${ATHLETE_ID}\n`);

  // Test 1: Health Check
  console.log(`${colors.cyan}🔧 Testing Health Check...${colors.reset}`);
  await testAPI('Health Check', 'GET', '/api/skill-performance/health');

  // Test 2: Mental Neural Training - Create Drill
  console.log(`\n${colors.cyan} Testing Mental Neural Training...${colors.reset}`);
  const drillData = {
    name: "Reaction Time Test",
    description: "Test athlete reaction time to visual stimuli",
    category: "reaction",
    estimatedDuration: 300,
    equipmentRequired: ["computer", "monitor"],
    instructions: "Click when you see the green light",
    config: {
      trials: 10,
      stimulusDelay: 1000,
      maxResponseTime: 2000
    },
    tags: ["reaction", "cognitive"],
    normativeData: {
      excellent: 200,
      good: 300,
      average: 400,
      belowAverage: 500
    }
  };

  const drillResponse = await testAPI(
    'Create Drill',
    'POST',
    '/api/mental-neural-training/drills',
    drillData,
    201
  );

  if (drillResponse && drillResponse._id) {
    const drillId = drillResponse._id;
    
    // Test 3: Start Session
    const sessionData = {
      athleteId: ATHLETE_ID,
      drillId: drillId,
      plannedDuration: 300,
      notes: "First reaction time test session"
    };

    const sessionResponse = await testAPI(
      'Start Session',
      'POST',
      '/api/mental-neural-training/sessions',
      sessionData,
      201
    );

    if (sessionResponse && sessionResponse._id) {
      const sessionId = sessionResponse._id;
      
      // Test 4: Execute Python Script
      const executeData = {
        athleteId: ATHLETE_ID,
        drillId: drillId,
        parameters: {
          trials: 10,
          stimulusDelay: 1000
        }
      };

      await testAPI(
        'Execute Python Script',
        'POST',
        '/api/mental-neural-training/execute-drill',
        executeData
      );

      // Test 5: Complete Session
      const completeData = {
        results: [
          {
            trialNumber: 1,
            stimulusType: "visual",
            reactionTime: 250,
            accuracy: true,
            responseTime: 250
          },
          {
            trialNumber: 2,
            stimulusType: "visual",
            reactionTime: 280,
            accuracy: true,
            responseTime: 280
          }
        ],
        endedAt: new Date().toISOString()
      };

      await testAPI(
        'Complete Session',
        'PUT',
        `/api/mental-neural-training/sessions/${sessionId}/complete`,
        completeData
      );

      // Test 6: Get Analytics
      await testAPI(
        'Get Analytics',
        'GET',
        `/api/mental-neural-training/analytics/athlete/${ATHLETE_ID}`
      );
    }
  }

  // Test 7: Skill Performance Testing - Daily Readiness
  console.log(`\n${colors.cyan}🏃‍♂️ Testing Skill Performance Testing...${colors.reset}`);
  const readinessData = {
    athleteId: ATHLETE_ID,
    date: new Date().toISOString(),
    sleepQuality: 8,
    fatigue: 3,
    muscleSoreness: 4,
    stress: 2,
    mood: 7
  };

  await testAPI(
    'Create Daily Readiness Assessment',
    'POST',
    '/api/skill-performance/neuromuscular-readiness/daily-readiness',
    readinessData,
    201
  );

  // Test 8: Get All Daily Readiness Assessments
  await testAPI(
    'Get All Daily Readiness Assessments',
    'GET',
    '/api/skill-performance/neuromuscular-readiness/daily-readiness'
  );

  // Test 9: Custom Obstacle Circuit
  const circuitData = {
    athleteId: ATHLETE_ID,
    date: new Date().toISOString(),
    circuitConfig: {
      obstacles: ["hurdle", "cone", "ladder", "wall"],
      targetTime: 120,
      penaltyTime: 10
    },
    results: {
      rawTime: 125,
      penalties: 2,
      penaltyTime: 20,
      finalAdjustedTime: 145
    }
  };

  await testAPI(
    'Create Custom Obstacle Circuit',
    'POST',
    '/api/skill-performance/functional-fitness/custom-obstacle-circuit',
    circuitData,
    201
  );

  // Test 10: Execute Custom Obstacle Circuit (Python)
  const executeCircuitData = {
    athleteId: ATHLETE_ID,
    circuitConfig: {
      obstacles: ["hurdle", "cone", "ladder"],
      targetTime: 90,
      penaltyTime: 5
    },
    performanceData: {
      rawTime: 95,
      penalties: 1
    }
  };

  await testAPI(
    'Execute Custom Obstacle Circuit (Python)',
    'POST',
    '/api/skill-performance/functional-fitness/custom-obstacle-circuit/execute',
    executeCircuitData
  );

  // Test 11: Simple Reaction Time Test
  const reactionData = {
    athleteId: ATHLETE_ID,
    date: new Date().toISOString(),
    testType: "light",
    trials: [
      {
        stimulusType: "light",
        reactionTime: 220,
        accuracy: true
      },
      {
        stimulusType: "light",
        reactionTime: 195,
        accuracy: true
      }
    ]
  };

  await testAPI(
    'Create Simple Reaction Time Test',
    'POST',
    '/api/skill-performance/reaction-coordination/simple-reaction-time',
    reactionData,
    201
  );

  // Test 12: Illinois Agility Test
  const agilityData = {
    athleteId: ATHLETE_ID,
    date: new Date().toISOString(),
    time: 15.2,
    gender: "male",
    age: 25,
    classification: "excellent",
    notes: "Good form, no penalties"
  };

  await testAPI(
    'Create Illinois Agility Test',
    'POST',
    '/api/skill-performance/speed-agility/illinois-agility-test',
    agilityData,
    201
  );

  // Test 13: Vertical Jump Test
  const jumpData = {
    athleteId: ATHLETE_ID,
    date: new Date().toISOString(),
    jumpHeight: 65,
    unit: "cm",
    jumpType: "countermovement",
    attempts: 3,
    bestJump: 65,
    notes: "Good explosive power"
  };

  await testAPI(
    'Create Vertical Jump Test',
    'POST',
    '/api/skill-performance/anaerobic-power/vertical-jump',
    jumpData,
    201
  );

  // Test 14: Generate Analytics
  const analyticsData = {
    athleteId: ATHLETE_ID,
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date().toISOString(),
    categories: ["all"]
  };

  await testAPI(
    'Generate Analytics',
    'POST',
    '/api/skill-performance/analytics/generate',
    analyticsData
  );

  // Test 15: Get Dashboard Stats
  await testAPI(
    'Get Dashboard Stats',
    'GET',
    `/api/skill-performance/dashboard/${ATHLETE_ID}`
  );

  // Test 16: Get All Tests for Athlete
  await testAPI(
    'Get All Tests for Athlete',
    'GET',
    `/api/skill-performance/athlete/${ATHLETE_ID}/all-tests`
  );

  // Summary
  console.log(`\n${colors.bright}${colors.blue} Test Summary${colors.reset}`);
  console.log(`Total Tests: ${totalTests}`);
  console.log(`${colors.green}Passed: ${passedTests}${colors.reset}`);
  console.log(`${colors.red}Failed: ${failedTests}${colors.reset}`);
  
  if (failedTests === 0) {
    console.log(`\n${colors.green} All tests passed! Your API is working perfectly!${colors.reset}`);
  } else {
    console.log(`\n${colors.yellow}  Some tests failed. Check the details above.${colors.reset}`);
  }

  console.log(`\n${colors.cyan} Next Steps:${colors.reset}`);
  console.log(`1. Review any failed tests above`);
  console.log(`2. Check your backend logs for errors`);
  console.log(`3. Verify Python scripts are accessible`);
  console.log(`4. Test with Postman using the collection file`);
  console.log(`5. Check database connections and models`);
}

// Error handling
process.on('unhandledRejection', (error) => {
  console.error(`${colors.red}Unhandled Promise Rejection:${colors.reset}`, error);
  process.exit(1);
});

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests().catch((error) => {
    console.error(`${colors.red}Test execution failed:${colors.reset}`, error);
    process.exit(1);
  });
}

module.exports = { runAllTests, testAPI };
