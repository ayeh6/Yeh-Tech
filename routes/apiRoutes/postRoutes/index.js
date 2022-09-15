const router = require('express').Router();
const apiController = require('../../../controllers/apiController');

router.route('/create').post(apiController.createPost);
router.route('/update/:postID').patch(apiController.updatePost);
router.route('/delete/:postID').delete(apiController.deletePost);

module.exports = router;