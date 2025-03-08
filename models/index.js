const blogUser = require('./user');
const Post = require('./post');
const Comment = require('./comment')
const userFollows = require('./userFollows')

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

// Many-to-many relationship to represent following
blogUser.belongsToMany(blogUser, {
  foreignKey: 'follower_id',  // The user who is following
  through: 'user_follows',  // The join table
  as: 'following',  // Alias for following users
});

blogUser.belongsToMany(blogUser, {
  foreignKey: 'followed_id',  // The user being followed
  through: 'user_follows',  // The join table
  as: 'followers',  // Alias for followers
});



module.exports = { blogUser, Post, Comment, userFollows };




