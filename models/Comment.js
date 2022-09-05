const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const {nanoid} = require('nanoid');

class Comment extends Model {}

Comment.init(
   {
      commentID: {
         type: DataTypes.UUID,
         primaryKey: true,
         defaultValue: nanoid,
      },
      comment: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notNull: true,
         }
      },
      postID: {
         type: DataTypes.UUID,
         allowNull: false,
         validate: {
            notNull: true,
         },
         references: {
            model: 'posts',
            key: 'postID',
         }
      },
      userID: {
         type: DataTypes.UUID,
         allowNull: false,
         validate: {
            notNull: true,
         },
         references: {
            model: 'users',
            key: 'userID',
         }
      }
   },
   {
      sequelize,
      modelName: 'comments',
   }
);

module.exports = Comment;