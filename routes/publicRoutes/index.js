const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const postsRoutes = require('./postsRoutes');
const publicController = require('../../controllers/publicController');

router.use('/users', usersRoutes);
router.use('/posts', postsRoutes);
router.route('/dashboard').get(publicController.getUserDashboardPage);
router.use('/login', publicController.getLoginPage);
router.use('/signup', publicController.getSignUpPage);
router.use('/', publicController.getHomePage);

module.exports = router;