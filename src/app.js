const express = require('express');
const cors = require('cors');
const connectDB = require('./db/database.js');
const fitnessRoutes = require('./routes/fitnessRoutes.js');
const athleteRoutes = require('./routes/athletes.js');
const healthRelatedFitnessRoutes = require('./routes/healthRelatedFitness.js');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');
const mentalNeuralTrainingRoutes = require('./routes/mentalNeuralTraining.routes');
const hrfAssessmentRoutes = require('./routes/hrfAssessment.routes');
const hrfPythonRoutes = require('./routes/hrfPython.routes');

const app = express();

// Middleware
app.use(logger);
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

// Routes
app.use('/api/fitness', fitnessRoutes);
app.use('/api/athletes', athleteRoutes);
app.use('/api/health-related-fitness', healthRelatedFitnessRoutes);
app.use('/api/mental-neural-training', mentalNeuralTrainingRoutes);
app.use('/api/hrf/assessments', hrfAssessmentRoutes);
app.use('/api/hrf/python', hrfPythonRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', notFound);

module.exports = app;  
