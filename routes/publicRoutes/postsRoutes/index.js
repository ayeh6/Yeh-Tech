const router = require('express').Router();
const publicController = require('../../../controllers/publicController');

router.route('/create').get(publicController.getCreatePostPage);
router.route('/edit/:postID').get(publicController.getEditorPage);
router.route('/:postID').get(publicController.getPostPage);

module.exports = router;