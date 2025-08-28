const { HealthRelatedFitness } = require('../models/health.model');
const HRFAssessment = require('../models/hrfAssessment.model');

// Evaluate calculations from test definition
function evaluate(formula, values) {
  // Very basic and safe evaluator for formulas using dependsOn ids
  // Replace ids with numeric values; allow + - * / ( ) and decimals
  const safe = formula.replace(/[^0-9+\-*/(). _a-z]/gi, '');
  const expr = safe.replace(/[a-zA-Z_][a-zA-Z0-9_]*/g, (id) => {
    const v = values[id];
    if (v === undefined || v === null || Number.isNaN(Number(v))) return '0';
    return String(Number(v));
  });
  // eslint-disable-next-line no-new-func
  return Function(`return (${expr})`)();
}

exports.createAssessment = async (req, res, next) => {
  try {
    const { athleteId, testId, inputs = [], notes } = req.body;

    // Pull test definition to know calculations
    const moduleDoc = await HealthRelatedFitness.findOne({ isActive: true });
    if (!moduleDoc) return res.status(404).json({ message: 'Health-Related Fitness module not found' });
    const test = moduleDoc.getTestById(testId);
    if (!test) return res.status(404).json({ message: 'Test not found' });

    // Map inputs by id for calculation
    const valueMap = Object.fromEntries(inputs.map(i => [i.id, i.value]));
    const calculations = (test.calculations || []).map(calc => ({
      id: calc.id,
      name: calc.name,
      unit: calc.unit,
      value: Number(evaluate(calc.formula, valueMap))
    }));

    const doc = await HRFAssessment.create({
      athleteId,
      testId,
      testName: test.name,
      category: test.category,
      inputs,
      calculations,
      notes
    });

    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
};

exports.listAssessments = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.athleteId) filter.athleteId = req.query.athleteId;
    if (req.query.testId) filter.testId = req.query.testId;
    const docs = await HRFAssessment.find(filter).sort({ performedAt: -1 });
    res.json(docs);
  } catch (err) {
    next(err);
  }
};

exports.getAssessment = async (req, res, next) => {
  try {
    const doc = await HRFAssessment.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Assessment not found' });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

exports.deleteAssessment = async (req, res, next) => {
  try {
    const doc = await HRFAssessment.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Assessment not found' });
    res.json({ message: 'Assessment deleted' });
  } catch (err) {
    next(err);
  }
};


