const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcryptjs');
const {nanoid} = require('nanoid');

class User extends Model {}

User.init(
   {
      userID: {
         type: DataTypes.UUID,
         primaryKey: true,
         defaultValue: nanoid,
      },
      username: {
         type: DataTypes.STRING(32),
         allowNull: false,
         validate: {
            notNull: true,
         }
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notNull: true,
            len: [6],
         }
      }
   }
);

module.exports = User;