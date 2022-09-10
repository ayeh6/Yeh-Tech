const { User, Post, Comment } = require('../models');
const sequelize = require('sequelize');

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
   const posts = postsData.map(post => post.get({plain: true}));
   res.render('homepage', {
      posts,
   })
}

const getUserDashboardPage = async (req, res) => {
   res.render('dashboard', {

   });
}

const getPostPage = async (req, res) => {
   res.render('post', {

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