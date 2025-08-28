const { HealthRelatedFitness } = require('../models/health.model.js');
const connectDB = require('../db/database.js');
require('dotenv').config();

// Comprehensive health-related fitness module data
const healthRelatedFitnessModule = {
  id: 'health-fitness-001',
  name: 'Health-Related Fitness Assessment',
  description: 'Comprehensive assessment of body composition, aerobic endurance, strength, flexibility, and balance',
  subModules: [
    {
      id: 'sub-2-1',
      name: 'Body Composition & Anthropometry',
      description: 'Assessment of body composition using various methods',
      tests: [
        {
          id: 'dexa-scan',
          name: 'DEXA Scan',
          description: 'Dual-energy X-ray absorptiometry for precise body composition',
          category: 'body_composition',
          estimatedDuration: 15,
          equipmentRequired: ['DEXA Scanner'],
          instructions: 'Position athlete supine on scanner bed. Ensure minimal clothing and remove all metal objects.',
          hasMedia: true,
          hasTimer: false,
          hasAudio: false,
          dataFields: [
            { id: 'total_mass', name: 'Total Mass', type: 'number', unit: 'kg', required: true },
            { id: 'fat_mass', name: 'Fat Mass', type: 'number', unit: 'kg', required: true },
            { id: 'lean_mass', name: 'Lean Mass', type: 'number', unit: 'kg', required: true },
            { id: 'bone_density', name: 'Bone Mineral Density', type: 'number', unit: 'g/cm²', required: true }
          ],
          calculations: [
            {
              id: 'body_fat_percentage',
              name: 'Body Fat Percentage',
              formula: '(fat_mass / total_mass) * 100',
              unit: '%',
              dependsOn: ['fat_mass', 'total_mass']
            }
          ]
        },
        {
          id: 'skinfolds-7site',
          name: 'Skinfolds (7-site)',
          description: 'Seven-site skinfold measurement for body fat estimation',
          category: 'body_composition',
          estimatedDuration: 10,
          equipmentRequired: ['Skinfold Calipers'],
          instructions: 'Take measurements on right side of body. Pinch skin and subcutaneous fat, apply calipers 1cm below fingers.',
          hasMedia: true,
          hasTimer: false,
          hasAudio: false,
          dataFields: [
            { id: 'chest', name: 'Chest', type: 'number', unit: 'mm', required: true, min: 0, max: 50 },
            { id: 'axilla', name: 'Axilla', type: 'number', unit: 'mm', required: true, min: 0, max: 50 },
            { id: 'tricep', name: 'Tricep', type: 'number', unit: 'mm', required: true, min: 0, max: 50 },
            { id: 'subscapular', name: 'Subscapular', type: 'number', unit: 'mm', required: true, min: 0, max: 50 },
            { id: 'abdomen', name: 'Abdomen', type: 'number', unit: 'mm', required: true, min: 0, max: 50 },
            { id: 'suprailiac', name: 'Suprailiac', type: 'number', unit: 'mm', required: true, min: 0, max: 50 },
            { id: 'thigh', name: 'Thigh', type: 'number', unit: 'mm', required: true, min: 0, max: 50 }
          ],
          calculations: [
            {
              id: 'sum_skinfolds',
              name: 'Sum of Skinfolds',
              formula: 'chest + axilla + tricep + subscapular + abdomen + suprailiac + thigh',
              unit: 'mm',
              dependsOn: ['chest', 'axilla', 'tricep', 'subscapular', 'abdomen', 'suprailiac', 'thigh']
            }
          ]
        },
        {
          id: 'bia',
          name: 'BIA',
          description: 'Bioelectrical Impedance Analysis',
          category: 'body_composition',
          estimatedDuration: 5,
          equipmentRequired: ['BIA Device'],
          instructions: 'Ensure athlete is hydrated, has not exercised recently, and has removed shoes and socks.',
          hasMedia: false,
          hasTimer: false,
          hasAudio: false,
          dataFields: [
            { id: 'impedance', name: 'Impedance', type: 'number', unit: 'Ω', required: true },
            { id: 'body_fat_percent', name: 'Body Fat %', type: 'number', unit: '%', required: true },
            { id: 'muscle_mass', name: 'Muscle Mass', type: 'number', unit: 'kg', required: true },
            { id: 'water_percent', name: 'Body Water %', type: 'number', unit: '%', required: true }
          ],
          calculations: []
        },
        {
          id: 'girth-measurements',
          name: 'Girth Measurements',
          description: 'Circumference measurements at key body sites',
          category: 'body_composition',
          estimatedDuration: 8,
          equipmentRequired: ['Measuring Tape'],
          instructions: 'Use non-elastic tape measure. Take measurements at end of normal expiration.',
          hasMedia: false,
          hasTimer: false,
          hasAudio: false,
          dataFields: [
            { id: 'waist', name: 'Waist', type: 'number', unit: 'cm', required: true },
            { id: 'hip', name: 'Hip', type: 'number', unit: 'cm', required: true },
            { id: 'neck', name: 'Neck', type: 'number', unit: 'cm', required: true },
            { id: 'chest', name: 'Chest', type: 'number', unit: 'cm', required: true },
            { id: 'arm_relaxed', name: 'Arm (Relaxed)', type: 'number', unit: 'cm', required: true },
            { id: 'arm_flexed', name: 'Arm (Flexed)', type: 'number', unit: 'cm', required: true },
            { id: 'thigh', name: 'Thigh', type: 'number', unit: 'cm', required: true }
          ],
          calculations: [
            {
              id: 'waist_hip_ratio',
              name: 'Waist-Hip Ratio',
              formula: 'waist / hip',
              unit: 'ratio',
              dependsOn: ['waist', 'hip']
            }
          ]
        }
      ]
    },
    {
      id: 'sub-2-2',
      name: 'Aerobic Endurance',
      description: 'Assessment of cardiovascular fitness and aerobic capacity',
      tests: [
        {
          id: 'cpet-lab',
          name: 'CPET (Lab)',
          description: 'Cardiopulmonary Exercise Test with metabolic cart',
          category: 'aerobic_endurance',
          estimatedDuration: 45,
          equipmentRequired: ['Metabolic Cart', 'Cycle Ergometer', 'ECG Monitor'],
          instructions: 'Incremental test starting at 50W, increasing 25W every minute until exhaustion.',
          hasMedia: true,
          hasTimer: false,
          hasAudio: false,
          dataFields: [
            { id: 'vo2_max', name: 'VO₂ Max', type: 'number', unit: 'ml/kg/min', required: true },
            { id: 'max_hr', name: 'Max Heart Rate', type: 'number', unit: 'bpm', required: true },
            { id: 'max_power', name: 'Max Power', type: 'number', unit: 'W', required: true },
            { id: 'rer_max', name: 'Max RER', type: 'number', unit: 'ratio', required: true },
            { id: 'test_duration', name: 'Test Duration', type: 'time', required: true }
          ],
          calculations: []
        },
        {
          id: 'shuttle-run-20m',
          name: '20m Shuttle Run',
          description: 'Progressive shuttle run test with audio cues',
          category: 'aerobic_endurance',
          estimatedDuration: 20,
          equipmentRequired: ['Cones', 'Audio System', '20m Space'],
          instructions: 'Run between 20m markers in time with audio beeps. Speed increases each level.',
          hasMedia: false,
          hasTimer: true,
          hasAudio: false,
          dataFields: [
            { id: 'final_level', name: 'Final Level', type: 'number', required: true, min: 1, max: 21 },
            { id: 'final_shuttles', name: 'Final Shuttles', type: 'number', required: true, min: 0, max: 15 },
            { id: 'total_shuttles', name: 'Total Shuttles', type: 'number', required: true }
          ],
          calculations: [
            {
              id: 'estimated_vo2max',
              name: 'Estimated VO₂ Max',
              formula: '31.025 + (3.238 * final_level) - (3.248 * age) + (0.1536 * final_level * age)',
              unit: 'ml/kg/min',
              dependsOn: ['final_level']
            }
          ]
        }
      ]
    },
    {
      id: 'sub-2-3',
      name: 'Muscular Strength & Endurance',
      description: 'Assessment of muscular strength, power, and endurance',
      tests: [
        {
          id: 'handheld-dynamometry',
          name: 'Handheld Dynamometry',
          description: 'Isometric strength testing using handheld dynamometer',
          category: 'strength_endurance',
          estimatedDuration: 15,
          equipmentRequired: ['Handheld Dynamometer'],
          instructions: 'Test major muscle groups. 3 trials per muscle group with 30s rest between trials.',
          hasMedia: false,
          hasTimer: false,
          hasAudio: false,
          dataFields: [
            { id: 'muscle_group', name: 'Muscle Group', type: 'dropdown', required: true, 
              options: ['Shoulder Flexors', 'Shoulder Extensors', 'Elbow Flexors', 'Elbow Extensors', 'Hip Flexors', 'Hip Extensors', 'Knee Flexors', 'Knee Extensors'] },
            { id: 'trial_1', name: 'Trial 1', type: 'number', unit: 'kg', required: true },
            { id: 'trial_2', name: 'Trial 2', type: 'number', unit: 'kg', required: true },
            { id: 'trial_3', name: 'Trial 3', type: 'number', unit: 'kg', required: true }
          ],
          calculations: [
            {
              id: 'max_force',
              name: 'Maximum Force',
              formula: 'Math.max(trial_1, trial_2, trial_3)',
              unit: 'kg',
              dependsOn: ['trial_1', 'trial_2', 'trial_3']
            }
          ]
        },
        {
          id: 'imtp-peak-force',
          name: 'IMTP Peak Force',
          description: 'Isometric Mid-Thigh Pull Peak Force assessment using force plates',
          category: 'strength_endurance',
          estimatedDuration: 15,
          equipmentRequired: ['Force Plates', 'Barbell', 'Pull Rack'],
          instructions: 'Perform maximal isometric pull from mid-thigh position. Record peak force.',
          hasMedia: true,
          hasTimer: false,
          hasAudio: false,
          dataFields: [
            { id: 'peak_force_n', name: 'Peak Force', type: 'number', unit: 'N', required: true, min: 0, max: 5000 },
            { id: 'rate_of_force_development', name: 'RFD (0-200ms)', type: 'number', unit: 'N/s', required: false },
            { id: 'trial_1', name: 'Trial 1', type: 'number', unit: 'N', required: true },
            { id: 'trial_2', name: 'Trial 2', type: 'number', unit: 'N', required: true },
            { id: 'trial_3', name: 'Trial 3', type: 'number', unit: 'N', required: true }
          ],
          calculations: [
            {
              id: 'best_peak_force',
              name: 'Best Peak Force',
              formula: 'Math.max(trial_1, trial_2, trial_3)',
              unit: 'N',
              dependsOn: ['trial_1', 'trial_2', 'trial_3']
            }
          ]
        }
      ]
    },
    {
      id: 'sub-2-4',
      name: 'Flexibility & Mobility',
      description: 'Assessment of joint range of motion and movement quality',
      tests: [
        {
          id: 'sit-and-reach',
          name: 'Sit-and-Reach',
          description: 'Hamstring and lower back flexibility test',
          category: 'flexibility',
          estimatedDuration: 5,
          equipmentRequired: ['Sit-and-Reach Box'],
          instructions: 'Sit with legs extended, reach forward as far as possible. Hold for 2 seconds.',
          hasMedia: false,
          hasTimer: false,
          hasAudio: false,
          dataFields: [
            { id: 'reach_distance', name: 'Reach Distance', type: 'number', unit: 'cm', required: true },
            { id: 'trial_1', name: 'Trial 1', type: 'number', unit: 'cm', required: true },
            { id: 'trial_2', name: 'Trial 2', type: 'number', unit: 'cm', required: true },
            { id: 'trial_3', name: 'Trial 3', type: 'number', unit: 'cm', required: true }
          ],
          calculations: [
            {
              id: 'best_reach',
              name: 'Best Reach',
              formula: 'Math.max(trial_1, trial_2, trial_3)',
              unit: 'cm',
              dependsOn: ['trial_1', 'trial_2', 'trial_3']
            }
          ]
        }
      ]
    },
    {
      id: 'sub-2-5',
      name: 'Balance & Proprioception',
      description: 'Assessment of static and dynamic balance, and proprioceptive capabilities',
      tests: [
        {
          id: 'y-balance-reach',
          name: 'Y-Balance Reach Test',
          description: 'Measures dynamic balance and proprioception in three directions',
          category: 'balance',
          estimatedDuration: 15,
          equipmentRequired: ['Y-Balance Kit', 'Measuring Tape'],
          instructions: 'Maintain single-leg stance while reaching as far as possible with the free limb in anterior, posteromedial, and posterolateral directions. Test both legs.',
          hasMedia: true,
          hasTimer: false,
          hasAudio: false,
          dataFields: [
            { id: 'leg_tested', name: 'Leg Tested', type: 'dropdown', required: true, options: ['Left', 'Right'] },
            { id: 'anterior_reach_1', name: 'Anterior Reach 1', type: 'number', unit: 'cm', required: true },
            { id: 'anterior_reach_2', name: 'Anterior Reach 2', type: 'number', unit: 'cm', required: true },
            { id: 'anterior_reach_3', name: 'Anterior Reach 3', type: 'number', unit: 'cm', required: true },
            { id: 'posteromedial_reach_1', name: 'Posteromedial Reach 1', type: 'number', unit: 'cm', required: true },
            { id: 'posteromedial_reach_2', name: 'Posteromedial Reach 2', type: 'number', unit: 'cm', required: true },
            { id: 'posteromedial_reach_3', name: 'Posteromedial Reach 3', type: 'number', unit: 'cm', required: true },
            { id: 'posterolateral_reach_1', name: 'Posterolateral Reach 1', type: 'number', unit: 'cm', required: true },
            { id: 'posterolateral_reach_2', name: 'Posterolateral Reach 2', type: 'number', unit: 'cm', required: true },
            { id: 'posterolateral_reach_3', name: 'Posterolateral Reach 3', type: 'number', unit: 'cm', required: true }
          ],
          calculations: [
            {
              id: 'composite_score',
              name: 'Composite Score',
              formula: '(Math.max(anterior_reach_1, anterior_reach_2, anterior_reach_3) + Math.max(posteromedial_reach_1, posteromedial_reach_2, posteromedial_reach_3) + Math.max(posterolateral_reach_1, posterolateral_reach_2, posterolateral_reach_3)) / (3 * leg_length)',
              unit: '%',
              dependsOn: ['anterior_reach_1', 'anterior_reach_2', 'anterior_reach_3', 'posteromedial_reach_1', 'posteromedial_reach_2', 'posteromedial_reach_3', 'posterolateral_reach_1', 'posterolateral_reach_2', 'posterolateral_reach_3', 'leg_length']
            }
          ]
        }
      ]
    }
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