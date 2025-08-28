const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/mentalNeuralTraining.controller');
const validateBody = require('../middlewares/validateBody');

// Drills
router.get('/drills', ctrl.listDrills);
router.post('/drills', validateBody(['name', 'category']), ctrl.createDrill);
router.get('/drills/:id', ctrl.getDrill);
router.put('/drills/:id', ctrl.updateDrill);
router.delete('/drills/:id', ctrl.deleteDrill);

// Sessions
router.get('/sessions', ctrl.listSessions);
router.post('/sessions', validateBody(['athleteId', 'drillId']), ctrl.createSession);
router.get('/sessions/:id', ctrl.getSession);
router.put('/sessions/:id', ctrl.updateSession);
router.delete('/sessions/:id', ctrl.deleteSession);

module.exports = router;


