const router = require('express').Router();
const publicController = require('../../../controllers/publicController');

router.use('/create', publicController.getCreatePostPage);
router.use('/edit/:postID', publicController.getEditorPage);
router.use('/:postID', publicController.getPostPage);

module.exports = router;