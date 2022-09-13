const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { nanoid } = require('nanoid');

class Comment extends Model { }

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
      },
      dateCreated: {
         type: DataTypes.DATEONLY,
         defaultValue: DataTypes.NOW,
         get() {
            return this.getDataValue('dateCreated').toLocaleString('en-GB', {timezone: 'UTC'});
         }
      },
      timeCreated: {
         type: DataTypes.TIME,
         defaultValue: DataTypes.NOW,
         get() {
            return this.getDataValue('timeCreated').toLocaleString('en-GB', {timezone: 'UTC'});
         }
      }
   },
   {
      sequelize,
      modelName: 'comments',
   }
);

module.exports = Comment;