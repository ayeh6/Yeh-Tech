const router = require('express').Router();
const publicController = require('../../../controllers/publicController');

router.route('/:username').get(publicController.getUserDashboardPage);

module.exports = router;