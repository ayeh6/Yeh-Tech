const router = require('express').Router();
const apiController = require('../../../controllers/apiController');

router.route('/signout').post(apiController.signoutUser);
router.route('/signup').post(apiController.signupUser);
router.route('/login').post(apiController.loginUser);

module.exports = router;