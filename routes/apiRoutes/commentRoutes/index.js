const router = require('express').Router();
const apiController = require('../../../controllers/apiController');

router.route('/create').post(apiController.createComment);
router.route('/update/:commentID').patch(apiController.updateComment);
router.route('/delete/:commentID').delete(apiController.deleteComment);

module.exports = router;