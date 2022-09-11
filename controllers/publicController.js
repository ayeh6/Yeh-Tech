const { User, Post, Comment } = require('../models');
const sequelize = require('sequelize');

const getLoggedInUser = (req) => {
   if (req.session.isLoggedIn) {
      const isLoggedIn = req.session.isLoggedIn;
      const loggedInUsername = req.session.user.username;
      const loggedInUser = {
         isLoggedIn: isLoggedIn,
         username: loggedInUsername,
      }
      return loggedInUser;
   } else {
      return {
         isLoggedIn: false,
         username: null,
      };
   }

}

const getHomePage = async (req, res) => {
   const postsData = await Post.findAll({
      attributes: [
         'postID',
         'title',
         'content',
         [
            sequelize.literal(`(SELECT username FROM users WHERE posts.userID = users.userID)`),
            'username',
         ],
         [
            sequelize.fn(
               "DATE_FORMAT",
               sequelize.col("dateCreated"),
               "%m/%d/%Y",
            ),
            "dateCreated",
         ],
         [
            sequelize.fn(
               "DATE_FORMAT",
               sequelize.col("timeCreated"),
               "%h:%i %p"
            ),
            "timeCreated",
         ]
      ]
   });
   const posts = postsData.map(post => post.get({ plain: true }));
   const loggedInUser = getLoggedInUser(req);
   res.render('homepage', {
      posts,
      loggedInUser,
   })
}

const getUserDashboardPage = async (req, res) => {
   console.log(req);
   const user = await User.findOne({
      attributes: [
         'userID',
         'username',
      ],
      where: {
         username: req.params.username
      }
   });
   if(!user) {
      res.render('404', {
         error: true,
      });
      return;
   }
   const postsData = await Post.findAll({
      attributes: [
         'postID',
         'title',
         'content',
         [
            sequelize.fn(
               "DATE_FORMAT",
               sequelize.col("dateCreated"),
               "%m/%d/%Y",
            ),
            "dateCreated",
         ],
         [
            sequelize.fn(
               "DATE_FORMAT",
               sequelize.col("timeCreated"),
               "%h:%i %p"
            ),
            "timeCreated",
         ]
      ],
      where: {
         userID: user.dataValues.userID
      }
   });
   const posts = postsData.map(post => post.get({ plain: true }));
   const username = user.username;
   const loggedInUser = getLoggedInUser(req);
   res.render('dashboard', {
      posts,
      username,
      loggedInUser,
   });
}

const getPostPage = async (req, res) => {
   const postID = req.params.postID;
   const postData = await Post.findOne({
      attributes: [
         'title',
         'content',
         [
            sequelize.literal(`(SELECT username FROM users WHERE posts.userID = users.userID)`),
            'username',
         ],
         [
            sequelize.fn(
               "DATE_FORMAT",
               sequelize.col("dateCreated"),
               "%m/%d/%Y",
            ),
            "dateCreated",
         ],
         [
            sequelize.fn(
               "DATE_FORMAT",
               sequelize.col("timeCreated"),
               "%h:%i %p"
            ),
            "timeCreated",
         ],
      ],
      where: {
         postID: postID,
      }
   });
   if(!postData) {
      res.render('404', {
         error: true,
      });
      return;
   }
   const post = postData.dataValues;
   console.log(post);
   const loggedInUser = getLoggedInUser(req);
   res.render('post', {
      loggedInUser,
      post,
   });
}

const getCreatePostPage = async (req, res) => {
   res.render('create', {

   });
}

const getEditorPage = async (req, res) => {
   res.render('editor', {

   });
}

const getLoginPage = async (req, res) => {
   res.render('login', {

   });
}

const getSignUpPage = async (req, res) => {
   res.render('signup', {

   });
}

module.exports = {
   getHomePage,
   getUserDashboardPage,
   getPostPage,
   getCreatePostPage,
   getEditorPage,
   getLoginPage,
   getSignUpPage,
}