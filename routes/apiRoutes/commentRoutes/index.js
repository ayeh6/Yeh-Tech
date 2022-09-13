const router = require('express').Router();
const apiController = require('../../../controllers/apiController');

router.use('/create', apiController.createComment);
router.use('/update/:commentID', apiController.updateComment);
router.use('/delete/:commentID', apiController.deleteComment);

module.exports = router;