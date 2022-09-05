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
         type: DataTypes.TEXT('long'),
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
      modelName: 'posts',
   }
);

module.exports = Post;