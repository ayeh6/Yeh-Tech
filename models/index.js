const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User, {
   foreignKey: 'userID',
});
User.hasMany(Post, {
   foreignKey: 'userID',
   onDelete: 'CASCADE',
});

Comment.belongsTo(Post, {
   foreignKey: 'postID',
});
Post.hasMany(Comment, {
   foreignKey: 'postID',
   onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
   foreignKey: 'userID',
});
User.hasMany(Comment, {
   foreignKey: 'userID',
   onDelete: 'CASCADE',
});

module.exports = {
   User,
   Post,
   Comment,
};