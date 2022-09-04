const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const {nanoid} = require('nanoid');

class Post extends Model {}

Post.init(
   {
      postID: {
         type: DataTypes.UUID,
         primaryKey: true,
         defaultValue: nanoid,
      },
      title: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notNull: true,
         }
      },
      content: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notNull: true,
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
   }
);

module.exports = Post;