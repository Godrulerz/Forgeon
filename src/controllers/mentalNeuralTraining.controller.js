const { Drill, Session } = require('../models/mentalNeuralTraining.model');

// DRILLS
exports.createDrill = async (req, res, next) => {
  try {
    const drill = await Drill.create(req.body);
    res.status(201).json(drill);
  } catch (err) {
    next(err);
  }
};

exports.listDrills = async (_req, res, next) => {
  try {
    const drills = await Drill.find({}).sort({ createdAt: -1 });
    res.json(drills);
  } catch (err) {
    next(err);
  }
};

exports.getDrill = async (req, res, next) => {
  try {
    const drill = await Drill.findById(req.params.id);
    if (!drill) return res.status(404).json({ message: 'Drill not found' });
    res.json(drill);
  } catch (err) {
    next(err);
  }
};

exports.updateDrill = async (req, res, next) => {
  try {
    const drill = await Drill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!drill) return res.status(404).json({ message: 'Drill not found' });
    res.json(drill);
  } catch (err) {
    next(err);
  }
};

exports.deleteDrill = async (req, res, next) => {
  try {
    const drill = await Drill.findByIdAndDelete(req.params.id);
    if (!drill) return res.status(404).json({ message: 'Drill not found' });
    res.json({ message: 'Drill deleted' });
  } catch (err) {
    next(err);
  }
};

// SESSIONS
exports.createSession = async (req, res, next) => {
  try {
    const session = await Session.create(req.body);
    res.status(201).json(session);
  } catch (err) {
    next(err);
  }
};

exports.listSessions = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.athleteId) filter.athleteId = req.query.athleteId;
    if (req.query.drillId) filter.drillId = req.query.drillId;
    const sessions = await Session.find(filter).populate('drillId').sort({ createdAt: -1 });
    res.json(sessions);
  } catch (err) {
    next(err);
  }
};

exports.getSession = async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id).populate('drillId');
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (err) {
    next(err);
  }
};

exports.updateSession = async (req, res, next) => {
  try {
    const session = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (err) {
    next(err);
  }
};

exports.deleteSession = async (req, res, next) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json({ message: 'Session deleted' });
  } catch (err) {
    next(err);
  }
};


