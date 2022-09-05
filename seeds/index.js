const users = require('./users');
const posts = require('./posts');
const comments = require('./comments');
const { User, Post, Comment } = require('../models');
const sequelize = require('../config/connection');
const moment = require('moment');

const seeder = async () => {
   await sequelize.sync({ force: true });

   await User.bulkCreate(users, {
      individualHooks: true,
   });
   let allUsers = await User.findAll({
      attributes: ['userID']
   });

   let userindex = 0;
   for (let i = 0; i < posts.length; i++) {
      userindex++;
      if (userindex === allUsers.length) {
         userindex = 0;
      }
      posts[i].userID = allUsers[userindex].dataValues.userID;
      // posts[i].dateCreated = moment();
      // posts[i].timeCreated = moment();
   }
   await Post.bulkCreate(posts);

   let allPosts = await Post.findAll({
      attributes: ['postID'],
      order: [
         ['title', 'ASC']
      ]
   });
   let postindex = 0;
   userindex = 0;
   for (let i = 0; i < comments.length; i++) {
      if (i !== 0 && i % 3 === 0) {
         postindex++;
      }
      userindex++;
      if (userindex == allUsers.length) {
         userindex = 0;
      }
      //console.log(`postindex: ${postindex}, userindex:${userindex}`);
      comments[i].postID = allPosts[postindex].dataValues.postID;
      comments[i].userID = allUsers[userindex].dataValues.userID;
   }
   await Comment.bulkCreate(comments);
}

(async () => {
   await seeder();
})();