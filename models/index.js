const blogUser = require('./user');
const Post = require('./post');
const Comment = require('./comment')

blogUser.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(blogUser, {
  foreignKey: 'user_id'
});

blogUser.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Comment.belongsTo(blogUser, {
  foreignKey: 'user_id'
})

Post.hasMany(Comment, {
  foreignKey: 'post_id'
} )

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
} )



module.exports = { blogUser, Post, Comment };




