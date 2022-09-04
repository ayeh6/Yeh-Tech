const router = require('express').Router();
const apiController = require('../../../controllers/apiController');

router.use('/signout', apiController.signoutUser);
router.use('/signup', apiController.signupUser);
router.use('/login', apiController.loginUser);

module.exports = router;