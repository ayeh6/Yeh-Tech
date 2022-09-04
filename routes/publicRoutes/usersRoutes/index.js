const router = require('express').Router();
const publicController = require('../../../controllers/publicController');

router.use('/:username', publicController.getUserDashboardPage);

module.exports = router;