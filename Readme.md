# ForgeOn Backend API

This is the backend API for the ForgeOn Fitness Assessment Platform, providing database models and RESTful endpoints for managing athletes, fitness assessments, and analytics data.

## Database Models

### Athletes
- **Model**: `src/models/Athlete.js`
- **Schema**: Includes personal information, performance metrics, achievements, and social media links
- **Key Fields**: id, name, sport, position, team, performance metrics, achievements

### Health-Related Fitness
- **Model**: `src/models/HealthRelatedFitness.js`
- **Schema**: Modular structure with sub-modules and tests
- **Key Features**: Test protocols, data fields, calculations, normative data

### Test Programs
- **Model**: `src/models/TestProgram.js`
- **Schema**: Comprehensive test program structure with subtests and protocols
- **Key Features**: Multi-step protocols, equipment requirements, data validation

### Analytics
- **Model**: `src/models/Analytics.js`
- **Schema**: Performance tracking and trend analysis
- **Key Features**: Time-series data, performance metrics, recommendations

## API Endpoints

### Athletes
- `GET /api/athletes` - Get all athletes
- `GET /api/athletes/:id` - Get athlete by ID
- `POST /api/athletes` - Create new athlete
- `PUT /api/athletes/:id` - Update athlete
- `DELETE /api/athletes/:id` - Delete athlete
- `GET /api/athletes/sport/:sport` - Get athletes by sport
- `GET /api/athletes/status/:status` - Get athletes by status

### Health-Related Fitness
- `GET /api/health-related-fitness` - Get all modules
- `GET /api/health-related-fitness/:id` - Get module by ID
- `GET /api/health-related-fitness/tests/category/:category` - Get tests by category
- `GET /api/health-related-fitness/tests/:testId` - Get specific test
- `POST /api/health-related-fitness` - Create new module
- `PUT /api/health-related-fitness/:id` - Update module
- `DELETE /api/health-related-fitness/:id` - Delete module

## Setup Instructions

1. **Install Dependencies**
   ```bash
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

3. **Database Seeding**
   ```bash
   npm run seed
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## Database Seeding

The seeding process creates sample data for:
- Athletes with performance metrics and achievements
- Health-related fitness modules with tests and protocols
- Test programs with detailed protocols

Run seeding with:
```bash
npm run seed
```

## Data Structure

### Athlete Performance Metrics
```javascript
{
  id: 'vo2max-alex',
  name: 'VO₂ Max',
  category: 'endurance',
  value: 58.3,
  unit: 'ml/kg/min',
  changePercent: 3.2,
  trend: 'up',
  trendData: [54.2, 55.1, 56.3, 57.2, 58.3],
  percentile: 85,
  lastUpdated: new Date()
}
```

### Test Protocol Structure
```javascript
{
  id: 'dexa-scan',
  name: 'DEXA Scan',
  category: 'body_composition',
  estimatedDuration: 15,
  equipmentRequired: ['DEXA Scanner'],
  instructions: 'Position athlete supine on scanner bed...',
  dataFields: [
    { id: 'total_mass', name: 'Total Mass', type: 'number', unit: 'kg', required: true }
  ],
  calculations: [
    { id: 'body_fat_percentage', formula: '(fat_mass / total_mass) * 100' }
  ]
}
```

## Development

### Adding New Models
1. Create model file in `src/models/`
2. Define schema with validation
3. Create seed data in `src/data/`
4. Add API routes in `src/routes/`
5. Update main app.js with new routes

### Database Migrations
For schema changes, create migration scripts in `src/migrations/` and run them before seeding.

## API Documentation

Full API documentation is available at `/api/docs` when running in development mode.

## Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Include validation for all inputs
4. Write tests for new endpoints
5. Update documentation 
