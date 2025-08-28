const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/hrfAssessment.controller');
const validateBody = require('../middlewares/validateBody');

router.get('/', ctrl.listAssessments);
router.post('/', validateBody(['athleteId', 'testId', 'inputs']), ctrl.createAssessment);
router.get('/:id', ctrl.getAssessment);
router.delete('/:id', ctrl.deleteAssessment);

module.exports = router;


