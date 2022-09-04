const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
const publicRoutes = require('./publicRoutes');

router.use('/api', apiRoutes);
router.use('/', publicRoutes);

module.exports = router;


/*


/                       homepage
/users/:username        dashboard of a user
/posts/:postID          single post with comments
/posts/create           create a post
/posts/editor/:postID   editor for a certain post
/login                  login page
/signup                 signup page



homepage will populate through public controller
dashboard will populate through public controller
create post will be a page with title and content fields and a submit button
   if success, return to homepage with a toast at top for success
   else show toast at top with error
   check for empty fields

editor will be same as create post but with fields populated with data through public controller
login is just two fields (username, password) with a login button, also a signup button
signup is three fields (username, password, confirmpassword)\

api-stuff:
signout     /api/signout
signup      /api/signup
login       /api/login
createPost  /api/create-post/:postID
updatePost  /api/update-post/:postID
deletePost  /api/delete-post/:postID
createComment
deleteComment

*/