const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/hrfPython.controller');
const validateBody = require('../middlewares/validateBody');

// Run a single HRF test by calling mapped python script
router.post('/run', validateBody(['testId', 'inputs']), ctrl.runTest);

module.exports = router;


