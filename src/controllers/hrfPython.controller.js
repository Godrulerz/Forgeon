const path = require('path');
const { runPython } = require('../utils/pythonRunner');

// Map frontend testId -> python script relative path
// Update these mappings to match your actual file names
const TEST_TO_SCRIPT = {
  // Body Composition & Anthropometry
  'dexa-scan': path.join(__dirname, '../Health-Related Fitness/Body Composition & Anthropometry/dexa.py'),
  'bia': path.join(__dirname, '../Health-Related Fitness/Body Composition & Anthropometry/BIA.py'),
  'girth-measurements': path.join(__dirname, '../Health-Related Fitness/Body Composition & Anthropometry/Girth.py'),
  'skinfolds-7site': path.join(__dirname, '../Health-Related Fitness/Body Composition & Anthropometry/skinfold.py'),

  // Aerobic Endurance
  'vo2max-test': path.join(__dirname, '../Health-Related Fitness/Aerobic Endurance/CPET.py'),
  'cooper-test': path.join(__dirname, '../Health-Related Fitness/Aerobic Endurance/coppertest.py'),
  'ift-test': path.join(__dirname, '../Health-Related Fitness/Aerobic Endurance/ift.py'),
  'beep-test': path.join(__dirname, '../Health-Related Fitness/Aerobic Endurance/Shuttlerun.py'),
};

exports.runTest = async (req, res, next) => {
  try {
    const { testId, inputs, meta } = req.body; // inputs: [{id, value, unit?}]
    const script = TEST_TO_SCRIPT[testId];
    if (!script) return res.status(404).json({ message: `No python script mapped for testId ${testId}` });

    const output = await runPython(script, { inputs, meta });
    // Expect output as JSON { calculations: [...], metrics: [...], notes?: string }
    res.json({ testId, output });
  } catch (err) {
    next(err);
  }
};


