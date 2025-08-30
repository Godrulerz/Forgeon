const { Drill, Session, MentalNeuralAnalytics } = require('../models/mentalNeuralTraining.model');

const seedDrills = [
  {
    name: 'Visual Reaction Test',
    category: 'reaction',
    description: 'Test visual reaction time with color changes',
    difficulty: 'beginner',
    estimatedDuration: 300,
    equipmentRequired: ['computer', 'keyboard'],
    instructions: 'Press the spacebar as quickly as possible when the screen changes color',
    config: {
      duration: 300,
      trials: 10,
      restBetweenTrials: 3,
      difficulty: 'beginner',
      audioEnabled: false,
      visualCues: true,
      stimulusDelay: 2000,
      responseTimeout: 2000,
      targetAccuracy: 80,
      targetReactionTime: 500
    },
    tags: ['reaction', 'visual', 'beginner'],
    normativeData: {
      beginner: {
        avgReactionTime: 600,
        accuracy: 70,
        completionTime: 300
      },
      intermediate: {
        avgReactionTime: 450,
        accuracy: 80,
        completionTime: 250
      },
      advanced: {
        avgReactionTime: 350,
        accuracy: 90,
        completionTime: 200
      }
    }
  },
  {
    name: 'Auditory Reaction Test',
    category: 'reaction',
    description: 'Test auditory reaction time with sound cues',
    difficulty: 'intermediate',
    estimatedDuration: 240,
    equipmentRequired: ['computer', 'headphones'],
    instructions: 'Press the spacebar as quickly as possible when you hear a beep',
    config: {
      duration: 240,
      trials: 8,
      restBetweenTrials: 4,
      difficulty: 'intermediate',
      audioEnabled: true,
      visualCues: false,
      stimulusDelay: 1500,
      responseTimeout: 1500,
      targetAccuracy: 85,
      targetReactionTime: 400
    },
    tags: ['reaction', 'auditory', 'intermediate'],
    normativeData: {
      beginner: {
        avgReactionTime: 550,
        accuracy: 75,
        completionTime: 240
      },
      intermediate: {
        avgReactionTime: 400,
        accuracy: 85,
        completionTime: 200
      },
      advanced: {
        avgReactionTime: 300,
        accuracy: 95,
        completionTime: 160
      }
    }
  },
  {
    name: 'Dual Task Processing',
    category: 'dual_task',
    description: 'Simultaneously process visual and auditory stimuli',
    difficulty: 'advanced',
    estimatedDuration: 360,
    equipmentRequired: ['computer', 'keyboard', 'headphones'],
    instructions: 'Respond to both visual and auditory cues simultaneously',
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
    tags: ['dual_task', 'advanced', 'cognitive'],
    normativeData: {
      beginner: {
        avgReactionTime: 800,
        accuracy: 60,
        completionTime: 360
      },
      intermediate: {
        avgReactionTime: 600,
        accuracy: 75,
        completionTime: 300
      },
      advanced: {
        avgReactionTime: 450,
        accuracy: 85,
        completionTime: 240
      }
    }
  },
  {
    name: 'Memory Sequence Test',
    category: 'memory',
    description: 'Remember and repeat sequences of visual patterns',
    difficulty: 'intermediate',
    estimatedDuration: 420,
    equipmentRequired: ['computer', 'keyboard'],
    instructions: 'Watch the sequence of patterns and repeat them in order',
    config: {
      duration: 420,
      trials: 6,
      restBetweenTrials: 8,
      difficulty: 'intermediate',
      audioEnabled: false,
      visualCues: true,
      stimulusDelay: 3000,
      responseTimeout: 5000,
      targetAccuracy: 70,
      targetReactionTime: 800
    },
    tags: ['memory', 'sequence', 'intermediate'],
    normativeData: {
      beginner: {
        avgReactionTime: 1000,
        accuracy: 60,
        completionTime: 420
      },
      intermediate: {
        avgReactionTime: 800,
        accuracy: 70,
        completionTime: 360
      },
      advanced: {
        avgReactionTime: 600,
        accuracy: 80,
        completionTime: 300
      }
    }
  },
  {
    name: 'Focus Attention Test',
    category: 'focus',
    description: 'Maintain focus while ignoring distractions',
    difficulty: 'intermediate',
    estimatedDuration: 300,
    equipmentRequired: ['computer', 'keyboard'],
    instructions: 'Focus on the target stimulus while ignoring distracting elements',
    config: {
      duration: 300,
      trials: 10,
      restBetweenTrials: 3,
      difficulty: 'intermediate',
      audioEnabled: false,
      visualCues: true,
      stimulusDelay: 2000,
      responseTimeout: 2000,
      targetAccuracy: 80,
      targetReactionTime: 500
    },
    tags: ['focus', 'attention', 'intermediate'],
    normativeData: {
      beginner: {
        avgReactionTime: 650,
        accuracy: 70,
        completionTime: 300
      },
      intermediate: {
        avgReactionTime: 500,
        accuracy: 80,
        completionTime: 250
      },
      advanced: {
        avgReactionTime: 400,
        accuracy: 90,
        completionTime: 200
      }
    }
  }
];

const seedSessions = [
  {
    athleteId: 'athlete-1',
    drillId: null, // Will be set after drill creation
    coachId: 'coach-1',
    startedAt: new Date('2024-12-15T10:00:00Z'),
    endedAt: new Date('2024-12-15T10:05:00Z'),
    settings: {
      duration: 300,
      trials: 10,
      restBetweenTrials: 3,
      difficulty: 'beginner',
      audioEnabled: false,
      visualCues: true,
      stimulusDelay: 2000,
      responseTimeout: 2000,
      targetAccuracy: 80,
      targetReactionTime: 500
    },
    results: [
      { trial: 1, reactionTime: 450, accuracy: true, timestamp: new Date('2024-12-15T10:00:30Z'), stimulusType: 'visual', responseType: 'correct', difficulty: 'medium' },
      { trial: 2, reactionTime: 520, accuracy: true, timestamp: new Date('2024-12-15T10:00:45Z'), stimulusType: 'visual', responseType: 'correct', difficulty: 'medium' },
      { trial: 3, reactionTime: 380, accuracy: true, timestamp: new Date('2024-12-15T10:01:00Z'), stimulusType: 'visual', responseType: 'correct', difficulty: 'medium' },
      { trial: 4, reactionTime: 600, accuracy: false, timestamp: new Date('2024-12-15T10:01:15Z'), stimulusType: 'visual', responseType: 'incorrect', difficulty: 'medium' },
      { trial: 5, reactionTime: 420, accuracy: true, timestamp: new Date('2024-12-15T10:01:30Z'), stimulusType: 'visual', responseType: 'correct', difficulty: 'medium' },
      { trial: 6, reactionTime: 480, accuracy: true, timestamp: new Date('2024-12-15T10:01:45Z'), stimulusType: 'visual', responseType: 'correct', difficulty: 'medium' },
      { trial: 7, reactionTime: 350, accuracy: true, timestamp: new Date('2024-12-15T10:02:00Z'), stimulusType: 'visual', responseType: 'correct', difficulty: 'medium' },
      { trial: 8, reactionTime: 550, accuracy: true, timestamp: new Date('2024-12-15T10:02:15Z'), stimulusType: 'visual', responseType: 'correct', difficulty: 'medium' },
      { trial: 9, reactionTime: 400, accuracy: true, timestamp: new Date('2024-12-15T10:02:30Z'), stimulusType: 'visual', responseType: 'correct', difficulty: 'medium' },
      { trial: 10, reactionTime: 470, accuracy: true, timestamp: new Date('2024-12-15T10:02:45Z'), stimulusType: 'visual', responseType: 'correct', difficulty: 'medium' }
    ],
    status: 'completed',
    notes: 'Good performance, consistent reaction times'
  },
  {
    athleteId: 'athlete-1',
    drillId: null, // Will be set after drill creation
    coachId: 'coach-1',
    startedAt: new Date('2024-12-16T14:00:00Z'),
    endedAt: new Date('2024-12-16T14:04:00Z'),
    settings: {
      duration: 240,
      trials: 8,
      restBetweenTrials: 4,
      difficulty: 'intermediate',
      audioEnabled: true,
      visualCues: false,
      stimulusDelay: 1500,
      responseTimeout: 1500,
      targetAccuracy: 85,
      targetReactionTime: 400
    },
    results: [
      { trial: 1, reactionTime: 380, accuracy: true, timestamp: new Date('2024-12-16T14:00:20Z'), stimulusType: 'auditory', responseType: 'correct', difficulty: 'medium' },
      { trial: 2, reactionTime: 420, accuracy: true, timestamp: new Date('2024-12-16T14:00:35Z'), stimulusType: 'auditory', responseType: 'correct', difficulty: 'medium' },
      { trial: 3, reactionTime: 350, accuracy: true, timestamp: new Date('2024-12-16T14:00:50Z'), stimulusType: 'auditory', responseType: 'correct', difficulty: 'medium' },
      { trial: 4, reactionTime: 450, accuracy: true, timestamp: new Date('2024-12-16T14:01:05Z'), stimulusType: 'auditory', responseType: 'correct', difficulty: 'medium' },
      { trial: 5, reactionTime: 400, accuracy: true, timestamp: new Date('2024-12-16T14:01:20Z'), stimulusType: 'auditory', responseType: 'correct', difficulty: 'medium' },
      { trial: 6, reactionTime: 380, accuracy: true, timestamp: new Date('2024-12-16T14:01:35Z'), stimulusType: 'auditory', responseType: 'correct', difficulty: 'medium' },
      { trial: 7, reactionTime: 410, accuracy: true, timestamp: new Date('2024-12-16T14:01:50Z'), stimulusType: 'auditory', responseType: 'correct', difficulty: 'medium' },
      { trial: 8, reactionTime: 360, accuracy: true, timestamp: new Date('2024-12-16T14:02:05Z'), stimulusType: 'auditory', responseType: 'correct', difficulty: 'medium' }
    ],
    status: 'completed',
    notes: 'Excellent auditory reaction times, very consistent'
  }
];

const seedAnalytics = [
  {
    athleteId: 'athlete-1',
    period: 'month',
    startDate: new Date('2024-12-01T00:00:00Z'),
    endDate: new Date('2024-12-31T23:59:59Z'),
    category: 'overall',
    metrics: {
      avgReactionTime: 435,
      bestReactionTime: 350,
      accuracy: 90,
      consistencyScore: 85,
      improvementRate: 12,
      sessionsCompleted: 2,
      totalDrills: 2
    },
    trends: {
      reactionTime: 'improving',
      accuracy: 'improving',
      consistency: 'stable',
      overallTrend: 'improving'
    },
    recommendations: [
      {
        category: 'reaction_time',
        title: 'Continue Reaction Training',
        description: 'Your reaction times are improving well. Keep up the good work!',
        priority: 'medium',
        actionItems: [
          'Continue with current training frequency',
          'Try more advanced drills',
          'Focus on consistency'
        ]
      }
    ],
    sessionIds: [] // Will be populated after session creation
  }
];

const seedMentalNeuralTraining = async () => {
  try {
    console.log('🌱 Seeding Mental Neural Training data...');
    
    // Clear existing data
    await Drill.deleteMany({});
    await Session.deleteMany({});
    await MentalNeuralAnalytics.deleteMany({});
    
    // Create drills
    const createdDrills = await Drill.insertMany(seedDrills);
    console.log(`✅ Created ${createdDrills.length} drills`);
    
    // Update sessions with drill IDs
    const updatedSessions = seedSessions.map((session, index) => ({
      ...session,
      drillId: createdDrills[index % createdDrills.length]._id
    }));
    
    // Create sessions
    const createdSessions = await Session.insertMany(updatedSessions);
    console.log(`✅ Created ${createdSessions.length} sessions`);
    
    // Update analytics with session IDs
    const updatedAnalytics = seedAnalytics.map(analytics => ({
      ...analytics,
      sessionIds: createdSessions.map(session => session._id)
    }));
    
    // Create analytics
    const createdAnalytics = await MentalNeuralAnalytics.insertMany(updatedAnalytics);
    console.log(`✅ Created ${createdAnalytics.length} analytics records`);
    
    console.log('🎉 Mental Neural Training seeding completed successfully!');
    
    return {
      drills: createdDrills,
      sessions: createdSessions,
      analytics: createdAnalytics
    };
    
  } catch (error) {
    console.error('❌ Error seeding Mental Neural Training data:', error);
    throw error;
  }
};

module.exports = { seedMentalNeuralTraining };
