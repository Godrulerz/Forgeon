# ForgeOn Backend API - Complete Documentation

## Overview

ForgeOn is a comprehensive fitness assessment platform that provides database models, RESTful endpoints, and analytics systems for managing athletes, fitness assessments, and performance tracking. The platform integrates multiple specialized modules including Mental Neural Training, Skill Performance Testing, and Health-Related Fitness assessments.

## Architecture

The ForgeOn Backend API is built with Node.js, Express.js, and MongoDB, featuring a modular architecture that supports:

- **Mental Neural Training Module**: Cognitive training with Python script integration
- **Skill Performance Testing Module**: Athletic assessment across five categories
- **Health-Related Fitness Module**: Comprehensive fitness evaluation
- **Analytics System**: Performance tracking and trend analysis
- **Python Integration**: Seamless execution of specialized assessment scripts

## Core Modules

### Mental Neural Training Module

The Mental Neural Training module provides comprehensive cognitive training capabilities with drill management, session execution, performance tracking, and analytics integration.

#### Features
- **Cognitive Training Drills**: Multiple categories including reaction, focus, coordination, memory, dual-task, attention, and processing speed
- **Session Management**: Complete lifecycle from scheduled to completed with real-time execution
- **Python Script Integration**: Direct integration with Python scripts for drill execution
- **Performance Analytics**: Automatic calculation of reaction times, accuracy, and consistency scores
- **Recommendations Engine**: AI-powered suggestions based on performance data

#### API Endpoints

- `GET /drills` - List all drills with filtering
- `POST /drills` - Create new drill
- `GET /drills/:id` - Get specific drill
- `PUT /drills/:id` - Update drill
- `DELETE /drills/:id` - Deactivate drill
- `GET /sessions` - List all sessions with filtering
- `POST /sessions` - Create new session
- `POST /sessions/:sessionId/start` - Start a session
- `POST /sessions/:sessionId/complete` - Complete session with results
- `POST /execute-drill` - Execute drill using Python script
- `GET /analytics/athlete/:athleteId` - Get athlete analytics
- `POST /analytics/generate` - Generate comprehensive analytics
- `GET /dashboard/:athleteId` - Get dashboard statistics

### Skill Performance Testing Module

The Skill Performance Testing module evaluates various aspects of athletic performance across five main categories, providing automated test execution, real-time data collection, and comprehensive analytics.

#### Test Categories

1. **Neuromuscular Readiness**
   - Daily Readiness Assessment: Sleep quality, fatigue, muscle soreness, stress levels, and mood
   - Recovery Monitoring: Track athlete readiness for training and competition
   - Trend Analysis: Identify patterns in recovery and readiness

2. **Functional Fitness Simulation**
   - Custom Obstacle Circuits: Configurable obstacle courses with timing and penalty systems
   - Individual Obstacle Course Test (IOCT): Standardized functional fitness assessment
   - Performance Metrics: Time-based scoring with pass/fail criteria

3. **Reaction, Coordination & Reflex**
   - Simple Reaction Time: Light and sound stimulus response testing
   - Vestibulo-Ocular Reflex (VOR): Balance and eye movement coordination
   - H-Reflex Testing: Neurological reflex assessment
   - Deep Tendon Reflexes (DTR): Comprehensive reflex evaluation

4. **Speed, Acceleration & Agility**
   - Maximum Run-up Speed: Sprint performance analysis
   - Yo-Yo Intermittent Recovery: Endurance and recovery capacity
   - Illinois Agility Test: Standard agility assessment
   - 505 Agility Test: Directional change performance
   - T-Test: Multi-directional agility evaluation
   - Timing Gates: Split time analysis for speed development

5. **Anaerobic & Power**
   - Vertical Jump: Lower body power assessment
   - Broad Jump: Horizontal power and coordination
   - Time to Peak Force: Rate of force development
   - Wingate Anaerobic Test: Anaerobic capacity evaluation
   - Flight Test: Jump mechanics and power analysis

#### Features

- **Automated Test Execution** via Python script integration
- **Real-time Data Processing** with automatic metric calculation
- **Performance Rating System** (excellent, good, average, below_average, poor)
- **Percentile Rankings** based on normative data
- **Trend Analysis** (improving, declining, stable)
- **Consistency Scoring** for performance variability
- **Comprehensive Analytics** across all test categories
- **Personalized Recommendations** based on performance data

#### API Endpoints

- `GET /health` - Health check endpoint
- `POST /neuromuscular-readiness/daily-readiness` - Create daily readiness assessment
- `GET /neuromuscular-readiness/daily-readiness` - Get all assessments
- `POST /functional-fitness/custom-obstacle-circuit` - Create obstacle circuit test
- `POST /functional-fitness/custom-obstacle-circuit/execute` - Execute with Python script
- `POST /reaction-coordination/simple-reaction-time` - Create reaction time test
- `POST /reaction-coordination/simple-reaction-time/execute` - Execute with Python script
- `POST /speed-agility/illinois-agility-test` - Create agility test
- `POST /speed-agility/illinois-agility-test/execute` - Execute with Python script
- `POST /anaerobic-power/vertical-jump` - Create power test
- `POST /analytics/generate` - Generate comprehensive analytics
- `GET /analytics/:athleteId` - Get athlete analytics
- `GET /dashboard/:athleteId` - Get dashboard statistics
- `GET /athlete/:athleteId/all-tests` - Get all tests for athlete

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- Python 3.7+ (for script execution)
- Required Python packages for assessment scripts

### Installation

1. **Install Dependencies**
   ```bash
   cd project/backend
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file with:
   ```
   MONGODB_URI=mongodb://localhost:27017
   DB_NAME=forgeon
   CORS_ORIGIN=http://localhost:3000
   PORT=5000
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## API Testing

### Comprehensive Testing

The platform includes comprehensive testing capabilities:

- **Automated Test Suite**: `quick-start-testing.js` for quick API verification
- **Postman Collection**: `ForgeOn_API_Collection.json` for manual testing
- **Testing Guide**: Comprehensive testing instructions below
- **Testing Checklist**: Systematic testing approach

### Testing Workflow

1. **Health Check**: Verify API is running
2. **Module Testing**: Test each module's endpoints
3. **Python Integration**: Execute tests with scripts
4. **Analytics Generation**: Generate performance reports
5. **Dashboard Verification**: Check statistics and trends

## Complete Testing Checklist

### Pre-Testing Setup

#### Environment Preparation
- [ ] MongoDB is running and accessible
- [ ] Python is installed and in PATH
- [ ] All Python scripts are in correct locations
- [ ] Backend dependencies are installed (`npm install`)
- [ ] Environment variables are configured

#### Backend Server
- [ ] Start backend server (`npm run dev`)
- [ ] Verify server is running on expected port
- [ ] Check database connection is successful
- [ ] Verify CORS is properly configured

### Phase 1: Basic Connectivity Testing

#### Health Check Endpoints
- [ ] `GET /api/skill-performance/health` - Returns 200 OK
- [ ] Verify response contains status message
- [ ] Check response time is under 100ms

#### Database Connection
- [ ] MongoDB connection successful
- [ ] Models are properly loaded
- [ ] No connection errors in console

### Phase 2: Mental Neural Training Module

#### Drill Management
- [ ] `POST /api/mental-neural-training/drills` - Create new drill
  - [ ] Valid drill data creates successfully (201)
  - [ ] Invalid data returns validation errors (400)
  - [ ] Response contains drill ID and all fields
  - [ ] Database record is created correctly

- [ ] `GET /api/mental-neural-training/drills` - List all drills
  - [ ] Returns array of drills (200)
  - [ ] Pagination works correctly
  - [ ] Filtering by category works

- [ ] `GET /api/mental-neural-training/drills/:id` - Get specific drill
  - [ ] Valid ID returns drill (200)
  - [ ] Invalid ID returns 404
  - [ ] Response contains complete drill data

- [ ] `PUT /api/mental-neural-training/drills/:id` - Update drill
  - [ ] Valid update succeeds (200)
  - [ ] Invalid data returns validation errors (400)
  - [ ] Database record is updated correctly

- [ ] `DELETE /api/mental-neural-training/drills/:id` - Delete drill
  - [ ] Valid deletion succeeds (200)
  - [ ] Database record is soft-deleted (isActive: false)

#### Session Management
- [ ] `POST /api/mental-neural-training/sessions` - Start session
  - [ ] Valid session data creates successfully (201)
  - [ ] Session is linked to correct drill and athlete
  - [ ] StartedAt timestamp is set correctly

- [ ] `PUT /api/mental-neural-training/sessions/:id/start` - Start existing session
  - [ ] Session status changes to 'active'
  - [ ] StartedAt timestamp is updated

- [ ] `PUT /api/mental-neural-training/sessions/:id/complete` - Complete session
  - [ ] Session results are saved correctly
  - [ ] Metrics are calculated automatically
  - [ ] Analytics are updated
  - [ ] Performance tracking middleware executes

#### Python Script Integration
- [ ] `POST /api/mental-neural-training/execute-drill` - Execute Python script
  - [ ] Python script executes successfully
  - [ ] Parameters are passed correctly
  - [ ] Output is parsed correctly
  - [ ] Results are returned in expected format
  - [ ] Error handling for script failures

#### Analytics & Reporting
- [ ] `GET /api/mental-neural-training/analytics/athlete/:id` - Get athlete analytics
  - [ ] Returns comprehensive analytics data
  - [ ] Performance metrics are calculated correctly
  - [ ] Trends are identified properly

- [ ] `POST /api/mental-neural-training/analytics/generate` - Generate analytics report
  - [ ] Report generation succeeds
  - [ ] All metrics are calculated
  - [ ] Recommendations are generated

### Phase 3: Skill Performance Testing Module

#### Category 1: Neuromuscular Readiness

**Daily Readiness Assessment**
- [ ] `POST /api/skill-performance/neuromuscular-readiness/daily-readiness`
  - [ ] Creates assessment successfully (201)
  - [ ] Total score is calculated automatically
  - [ ] Readiness percentage is computed
  - [ ] Status is determined correctly
  - [ ] Performance rating is assigned

- [ ] `GET /api/skill-performance/neuromuscular-readiness/daily-readiness`
  - [ ] Returns all assessments (200)
  - [ ] Pagination works correctly
  - [ ] Filtering by date works

- [ ] `GET /api/skill-performance/neuromuscular-readiness/daily-readiness/:id`
  - [ ] Returns specific assessment (200)
  - [ ] Invalid ID returns 404

- [ ] `PUT /api/skill-performance/neuromuscular-readiness/daily-readiness/:id`
  - [ ] Updates assessment successfully (200)
  - [ ] Recalculates metrics automatically

- [ ] `DELETE /api/skill-performance/neuromuscular-readiness/daily-readiness/:id`
  - [ ] Deletes assessment successfully (200)

#### Category 2: Functional Fitness Simulation

**Custom Obstacle Circuit**
- [ ] `POST /api/skill-performance/functional-fitness/custom-obstacle-circuit`
  - [ ] Creates circuit test successfully (201)
  - [ ] Final adjusted time is calculated
  - [ ] Performance rating is assigned

- [ ] `POST /api/skill-performance/functional-fitness/custom-obstacle-circuit/execute`
  - [ ] Python script executes successfully
  - [ ] Results are parsed and stored
  - [ ] Analytics are updated

#### Category 3: Reaction, Coordination & Reflex

**Simple Reaction Time Test**
- [ ] `POST /api/skill-performance/reaction-coordination/simple-reaction-time`
  - [ ] Creates test successfully (201)
  - [ ] Metrics are calculated automatically
  - [ ] Performance rating is assigned

- [ ] `POST /api/skill-performance/reaction-coordination/simple-reaction-time/execute`
  - [ ] Python script executes successfully
  - [ ] Results are parsed and stored

#### Category 4: Speed, Acceleration & Agility

**Illinois Agility Test**
- [ ] `POST /api/skill-performance/speed-agility/illinois-agility-test`
  - [ ] Creates test successfully (201)
  - [ ] Classification is assigned correctly
  - [ ] Performance rating is assigned

- [ ] `POST /api/skill-performance/speed-agility/illinois-agility-test/execute`
  - [ ] Python script executes successfully
  - [ ] Results are parsed and stored

#### Category 5: Anaerobic & Power

**Vertical Jump Test**
- [ ] `POST /api/skill-performance/anaerobic-power/vertical-jump`
  - [ ] Creates test successfully (201)
  - [ ] Performance rating is assigned
  - [ ] Percentile is calculated

**Wingate Anaerobic Test**
- [ ] `POST /api/skill-performance/anaerobic-power/wingate-anaerobic-test`
  - [ ] Creates test successfully (201)
  - [ ] Performance rating is assigned
  - [ ] Percentile is calculated

### Phase 4: Analytics & Dashboard Testing

#### Analytics Generation
- [ ] `POST /api/skill-performance/analytics/generate`
  - [ ] Generates analytics successfully
  - [ ] All categories are processed
  - [ ] Performance trends are calculated
  - [ ] Recommendations are generated

#### Dashboard Statistics
- [ ] `GET /api/skill-performance/dashboard/:athleteId`
  - [ ] Returns comprehensive dashboard data
  - [ ] All test categories are included
  - [ ] Performance summaries are accurate
  - [ ] Recent trends are displayed

#### Athlete Analytics
- [ ] `GET /api/skill-performance/analytics/:athleteId`
  - [ ] Returns athlete-specific analytics
  - [ ] Performance history is complete
  - [ ] Improvement trends are visible

#### All Tests Retrieval
- [ ] `GET /api/skill-performance/athlete/:athleteId/all-tests`
  - [ ] Returns all tests for athlete
  - [ ] Tests are properly categorized
  - [ ] Data is complete and accurate

### Phase 5: Generic CRUD Operations

#### Update Operations
- [ ] All test types support PUT updates
- [ ] Validation works correctly
- [ ] Metrics are recalculated
- [ ] Performance ratings are updated

#### Delete Operations
- [ ] All test types support DELETE
- [ ] Soft delete is implemented correctly
- [ ] Related analytics are updated

### Phase 6: Python Script Integration

#### Script Execution
- [ ] All Python scripts are accessible
- [ ] Scripts execute without errors
- [ ] Output parsing works correctly
- [ ] Error handling is robust

#### Parameter Passing
- [ ] Parameters are passed correctly
- [ ] Data types are handled properly
- [ ] Default values work as expected

#### Result Processing
- [ ] Results are parsed correctly
- [ ] Database storage works
- [ ] Analytics updates are triggered

### Phase 7: Error Handling & Edge Cases

#### Validation Errors
- [ ] Missing required fields return 400
- [ ] Invalid data types return 400
- [ ] Validation messages are clear
- [ ] Partial updates are handled correctly

#### Not Found Errors
- [ ] Invalid IDs return 404
- [ ] Non-existent resources return 404
- [ ] Error messages are helpful

#### Server Errors
- [ ] Database connection failures are handled
- [ ] Python script errors are caught
- [ ] 500 errors include useful information
- [ ] Logging is comprehensive

### Phase 8: Performance Testing

#### Response Times
- [ ] All endpoints respond under 500ms
- [ ] Complex operations complete under 2s
- [ ] Analytics generation completes under 5s

#### Load Testing
- [ ] Multiple concurrent requests work
- [ ] Database performance is acceptable
- [ ] Memory usage is stable

#### Data Volume
- [ ] Large datasets are handled correctly
- [ ] Pagination works with many records
- [ ] Analytics scale appropriately

### Phase 9: Data Integrity

#### Database Consistency
- [ ] All required fields are stored
- [ ] Data types are correct
- [ ] Relationships are maintained
- [ ] Indexes are working properly

#### Analytics Accuracy
- [ ] Calculations are mathematically correct
- [ ] Percentiles are accurate
- [ ] Performance ratings are consistent
- [ ] Trends are calculated correctly

### Phase 10: Final Verification

#### End-to-End Testing
- [ ] Complete workflow from test creation to analytics
- [ ] Python integration works end-to-end
- [ ] All middleware executes correctly
- [ ] Data flows through entire system

#### Cross-Module Integration
- [ ] Mental Neural Training and Skill Performance Testing work together
- [ ] Analytics are shared between modules
- [ ] Performance tracking is consistent

#### Documentation Verification
- [ ] All endpoints are documented
- [ ] Examples are accurate
- [ ] Error responses are documented
- [ ] Usage instructions are clear

## Postman Testing Guide

### Setup Instructions

#### Import to Postman
1. Open Postman
2. Click "Import" → "Raw text"
3. Copy and paste the collection JSON from `ForgeOn_API_Collection.json`

#### Environment Variables
Create a new environment with these variables:
```
BASE_URL: http://localhost:3000
ATHLETE_ID: 507f1f77bcf86cd799439011
```

#### Start Your Backend
```bash
cd project/backend
npm install
npm run dev
```

### Health Check - Test First

#### GET Health Check
```
GET {{BASE_URL}}/api/skill-performance/health
```
**Expected Response:** `200 OK` with status message

### Mental Neural Training Module Testing

#### 1. Create Drill
```
POST {{BASE_URL}}/api/mental-neural-training/drills
Content-Type: application/json

{
  "name": "Reaction Time Test",
  "description": "Test athlete reaction time to visual stimuli",
  "category": "reaction",
  "estimatedDuration": 300,
  "equipmentRequired": ["computer", "monitor"],
  "instructions": "Click when you see the green light",
  "config": {
    "trials": 10,
    "stimulusDelay": 1000,
    "maxResponseTime": 2000
  },
  "tags": ["reaction", "cognitive"],
  "normativeData": {
    "excellent": 200,
    "good": 300,
    "average": 400,
    "belowAverage": 500
  }
}
```

#### 2. Start Session
```
POST {{BASE_URL}}/api/mental-neural-training/sessions
Content-Type: application/json

{
  "athleteId": "{{ATHLETE_ID}}",
  "drillId": "DRILL_ID_FROM_STEP_1",
  "plannedDuration": 300,
  "notes": "First reaction time test session"
}
```

#### 3. Execute Python Script
```
POST {{BASE_URL}}/api/mental-neural-training/execute-drill
Content-Type: application/json

{
  "athleteId": "{{ATHLETE_ID}}",
  "drillId": "DRILL_ID_FROM_STEP_1",
  "parameters": {
    "trials": 10,
    "stimulusDelay": 1000
  }
}
```

#### 4. Complete Session
```
PUT {{BASE_URL}}/api/mental-neural-training/sessions/SESSION_ID_FROM_STEP_2/complete
Content-Type: application/json

{
  "results": [
    {
      "trialNumber": 1,
      "stimulusType": "visual",
      "reactionTime": 250,
      "accuracy": true,
      "responseTime": 250
    },
    {
      "trialNumber": 2,
      "stimulusType": "visual",
      "reactionTime": 280,
      "accuracy": true,
      "responseTime": 280
    }
  ],
  "endedAt": "2024-01-15T10:30:00Z"
}
```

#### 5. Get Analytics
```
GET {{BASE_URL}}/api/mental-neural-training/analytics/athlete/{{ATHLETE_ID}}
```

### Skill Performance Testing Module Testing

#### Category 1: Neuromuscular Readiness

**Create Daily Readiness Assessment**
```
POST {{BASE_URL}}/api/skill-performance/neuromuscular-readiness/daily-readiness
Content-Type: application/json

{
  "athleteId": "{{ATHLETE_ID}}",
  "date": "2024-01-15T08:00:00Z",
  "sleepQuality": 8,
  "fatigue": 3,
  "muscleSoreness": 4,
  "stress": 2,
  "mood": 7
}
```

**Get All Daily Readiness Assessments**
```
GET {{BASE_URL}}/api/skill-performance/neuromuscular-readiness/daily-readiness
```

**Get Specific Assessment**
```
GET {{BASE_URL}}/api/skill-performance/neuromuscular-readiness/daily-readiness/ASSESSMENT_ID
```

#### Category 2: Functional Fitness Simulation

**Create Custom Obstacle Circuit**
```
POST {{BASE_URL}}/api/skill-performance/functional-fitness/custom-obstacle-circuit
Content-Type: application/json

{
  "athleteId": "{{ATHLETE_ID}}",
  "date": "2024-01-15T09:00:00Z",
  "circuitConfig": {
    "obstacles": ["hurdle", "cone", "ladder", "wall"],
    "targetTime": 120,
    "penaltyTime": 10
  },
  "results": {
    "rawTime": 125,
    "penalties": 2,
    "penaltyTime": 20,
    "finalAdjustedTime": 145
  }
}
```

**Execute Custom Obstacle Circuit (Python)**
```
POST {{BASE_URL}}/api/skill-performance/functional-fitness/custom-obstacle-circuit/execute
Content-Type: application/json

{
  "athleteId": "{{ATHLETE_ID}}",
  "circuitConfig": {
    "obstacles": ["hurdle", "cone", "ladder"],
    "targetTime": 90,
    "penaltyTime": 5
  },
  "performanceData": {
    "rawTime": 95,
    "penalties": 1
  }
}
```

#### Category 3: Reaction, Coordination & Reflex

**Create Simple Reaction Time Test**
```
POST {{BASE_URL}}/api/skill-performance/reaction-coordination/simple-reaction-time
Content-Type: application/json

{
  "athleteId": "{{ATHLETE_ID}}",
  "date": "2024-01-15T10:00:00Z",
  "testType": "light",
  "trials": [
    {
      "stimulusType": "light",
      "reactionTime": 220,
      "accuracy": true
    },
    {
      "stimulusType": "light",
      "reactionTime": 195,
      "accuracy": true
    }
  ]
}
```

**Execute Simple Reaction Time Test (Python)**
```
POST {{BASE_URL}}/api/skill-performance/reaction-coordination/simple-reaction-time/execute
Content-Type: application/json

{
  "athleteId": "{{ATHLETE_ID}}",
  "testType": "light",
  "trials": 5,
  "stimulusDelay": 1000
}
```

#### Category 4: Speed, Acceleration & Agility

**Create Illinois Agility Test**
```
POST {{BASE_URL}}/api/skill-performance/speed-agility/illinois-agility-test
Content-Type: application/json

{
  "athleteId": "{{ATHLETE_ID}}",
  "date": "2024-01-15T11:00:00Z",
  "time": 15.2,
  "gender": "male",
  "age": 25,
  "classification": "excellent",
  "notes": "Good form, no penalties"
}
```

**Execute Illinois Agility Test (Python)**
```
POST {{BASE_URL}}/api/skill-performance/speed-agility/illinois-agility-test/execute
Content-Type: application/json

{
  "athleteId": "{{ATHLETE_ID}}",
  "time": 16.8,
  "gender": "male",
  "age": 25
}
```

#### Category 5: Anaerobic & Power

**Create Vertical Jump Test**
```
POST {{BASE_URL}}/api/skill-performance/anaerobic-power/vertical-jump
Content-Type: application/json

{
  "athleteId": "{{ATHLETE_ID}}",
  "date": "2024-01-15T12:00:00Z",
  "jumpHeight": 65,
  "unit": "cm",
  "jumpType": "countermovement",
  "attempts": 3,
  "bestJump": 65,
  "notes": "Good explosive power"
}
```

**Create Wingate Anaerobic Test**
```
POST {{BASE_URL}}/api/skill-performance/anaerobic-power/wingate-anaerobic-test
Content-Type: application/json

{
  "athleteId": "{{ATHLETE_ID}}",
  "date": "2024-01-15T13:00:00Z",
  "peakPower": 850,
  "meanPower": 650,
  "fatigueIndex": 12.5,
  "testDuration": 30,
  "bodyWeight": 75,
  "notes": "Excellent anaerobic capacity"
}
```

### Analytics & Dashboard Testing

#### Generate Analytics
```
POST {{BASE_URL}}/api/skill-performance/analytics/generate
Content-Type: application/json

{
  "athleteId": "{{ATHLETE_ID}}",
  "startDate": "2024-01-01T00:00:00Z",
  "endDate": "2024-01-31T23:59:59Z",
  "categories": ["all"]
}
```

#### Get Athlete Analytics
```
GET {{BASE_URL}}/api/skill-performance/analytics/{{ATHLETE_ID}}
```

#### Get Dashboard Stats
```
GET {{BASE_URL}}/api/skill-performance/dashboard/{{ATHLETE_ID}}
```

#### Get All Tests for Athlete
```
GET {{BASE_URL}}/api/skill-performance/athlete/{{ATHLETE_ID}}/all-tests
```

### Generic CRUD Operations Testing

#### Update Test Record
```
PUT {{BASE_URL}}/api/skill-performance/anaerobic-power/vertical-jump/VERICAL_JUMP_ID
Content-Type: application/json

{
  "jumpHeight": 68,
  "notes": "Improved from previous attempt"
}
```

#### Delete Test Record
```
DELETE {{BASE_URL}}/api/skill-performance/anaerobic-power/vertical-jump/VERICAL_JUMP_ID
```

## Performance Metrics

### Calculation Methods

- **Reaction Time**: Average, best, and worst times
- **Accuracy**: Percentage of correct responses
- **Success Rate**: Percentage of responses under target time
- **Consistency Score**: Based on standard deviation
- **Overall Score**: Weighted combination of metrics
- **Performance Ratings**: Excellent, Good, Average, Below Average, Poor

### Analytics Integration

- **Total Test Counts** by category
- **Average Performance Scores** across time periods
- **Improvement Rates** for progress tracking
- **Consistency Scores** for reliability assessment
- **Best/Worst Performance** tracking

## Error Handling

### Common Error Scenarios

- **Python Script Errors**: Graceful fallback with error logging
- **Database Connection Issues**: Retry mechanisms and error reporting
- **Invalid Data**: Validation middleware with detailed error messages
- **Authentication Failures**: Proper HTTP status codes and error responses

### Error Response Format
```javascript
{
  "message": "Error description",
  "error": "Detailed error information",
  "timestamp": "2024-12-20T10:00:00.000Z"
}
```

## Security Considerations

### Authentication
- All endpoints require valid authentication tokens
- Token validation middleware
- Role-based access control (if implemented)

### Data Validation
- Input validation for all endpoints
- Schema validation for database operations
- Sanitization of user inputs

### Error Information
- Limited error details in production
- Comprehensive logging for debugging
- Secure error handling

## Monitoring and Logging

### Performance Monitoring
- Request/response timing
- Database query performance
- Python script execution time
- Memory usage tracking

### Error Logging
- Detailed error logs with stack traces
- Python script execution logs
- Database operation logs
- API request/response logs

## Development

### Adding New Models
1. Create model file in `src/models/`
2. Define schema with validation
3. Create seed data in `src/data/`
4. Add API routes in `src/routes/`
5. Update main app.js with new routes

### Code Standards
- Follow ESLint configuration
- Use meaningful commit messages
- Add JSDoc comments for functions
- Maintain test coverage

## Future Enhancements

### Planned Features
- **Machine Learning Integration** for predictive analytics
- **Advanced Visualization** for performance trends
- **Mobile App Support** for field testing
- **Real-time Notifications** for performance alerts
- **Real-time WebSocket Support** for live session monitoring
- **Multi-player Support** for competitive training sessions

### Technical Improvements
- **GraphQL API** for flexible data queries
- **WebSocket Support** for real-time updates
- **Microservice Architecture** for scalability
- **Advanced Caching** for performance optimization
- **Redis Integration** for frequently accessed data
- **Background Processing** for async analytics generation

## Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

### Testing Requirements
- **Unit Tests** for all new functions
- **Integration Tests** for API endpoints
- **Python Script Tests** for script integration
- **Performance Tests** for scalability

## Support

### Documentation
- API documentation in `docs/` directory
- Database schema documentation
- Python script documentation
- Testing guides and checklists

### Troubleshooting
- Check server logs for error details
- Verify Python script permissions
- Ensure MongoDB connection
- Validate authentication tokens
- Use health check endpoints for system status

### Contact
For support and questions, please refer to the main project documentation or create an issue in the repository.

## License

This project is part of the ForgeOn athletic performance system. All rights reserved.

---

*Last Updated: August 2025*
*Version: 1.0.0* 
