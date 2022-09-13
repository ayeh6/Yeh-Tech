const {User, Post, Comment} = require('../models');
const sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const signoutUser = (req,res) => {
   if(req.session.isLoggedIn) {
      req.session.destroy(() => {
         res.json({success: true});
      });
   }
}

const signupUser = async (req,res) => {
   try {
      const newUser = await User.create(req.body);
      req.session.save(() => {
         req.session.user = newUser;
         req.session.isLoggedIn = true;
         res.json({success: true});
      });
   } catch(error) {
      console.error(error);
      res.status(500).json({error});
   }
}

const loginUser = async (req,res) => {
   try {
      const user = await User.findOne({
         where: {
            username: req.body.username
         }
      });

      if(!user) {
         return res.status(401).json({error: 'Username not found'});
      }

      const passwordMatch = await bcrypt.compare(req.body.password, user.password);
      if(!passwordMatch) {
         return res.status(401).json({error: 'Incorrect password'});
      } else {
         req.session.save(() => {
            req.session.user = user;
            req.session.isLoggedIn = true;
            res.json({success: true});
         });
      }
   } catch(error) {
      console.error(error);
      res.status(500).json({error});
   }
}

const createPost = (req,res) => {

}

const updatePost = (req,res) => {

}

const deletePost = (req,res) => {

}

const createComment = async (req,res) => {
   try {
      const userID = req.session.user.userID;
      const newComment = {
         ...req.body,
         userID: userID,
      };
      console.log(newComment);
      await Comment.create(newComment);
      res.status(200).json(newComment);
   } catch(error) {
      console.error(error);
      res.status(500).json({error});
   }
}

const updateComment = async (req,res) => {
   try {
      const commentID = req.params.commentID;
      const updatedComment = req.body.updatedComment;

      await Comment.update({
         comment: updatedComment,
      },
      {
         where: {
            commentID: commentID
         }
      });
      res.status(200).json("success");
   } catch(error) {
      console.error(error);
      res.status(500).json({error})
   }
}

const deleteComment = async (req,res) => {
   try {
      const commentID = req.params.commentID;
      await Comment.destroy({
         where: {
            commentID: commentID,
         }
      });
      res.status(200).json({success: true});
   } catch(error) {
      console.error(error);
      res.status(500).json({error});
   }
}

module.exports = {
   signoutUser,
   signupUser,
   loginUser,
   createPost,
   updatePost,
   deletePost,
   createComment,
   updateComment,
   deleteComment,
}