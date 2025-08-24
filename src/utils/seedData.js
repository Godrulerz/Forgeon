const { HealthRelatedFitness } = require('../models');
const connectDB = require('../db/database');

// Your healthRelatedFitnessModule data goes here
const healthRelatedFitnessModule = {
  id: 'module-2',
  name: 'Health-Related Fitness',
  description: 'Comprehensive assessment of body composition, aerobic endurance, strength, and flexibility',
  subModules: [
    // ... copy your entire module data here
  ]
};

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await HealthRelatedFitness.deleteMany({});
    
    // Insert the module
    const module = new HealthRelatedFitness(healthRelatedFitnessModule);
    await module.save();
    
    console.log('Database seeded successfully');
    console.log(`Module created: ${module.name}`);
    console.log(`Total tests: ${module.totalTests}`);
    console.log(`Total duration: ${module.totalEstimatedDuration} minutes`);
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };