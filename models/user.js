const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');



class blogUser extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

blogUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'blog_user',
  }
);

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

module.exports = blogUser;



