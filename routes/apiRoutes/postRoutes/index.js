const router = require('express').Router();
const apiController = require('../../../controllers/apiController');

router.use('/create/:postID', apiController.createPost);
router.use('/update/:postID', apiController.updatePost);
router.use('/delete/:postID', apiController.deletePost);

module.exports = router;