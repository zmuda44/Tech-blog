const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class userFollows extends Model {}

userFollows.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    follower_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'blog_user',  // The model that the foreign key references
        key: 'id',
      },
      onDelete: 'CASCADE',  // If the user is deleted, remove the follow relationships
      allowNull: false,
    },
    followed_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'blog_user',
        key: 'id',
      },
      onDelete: 'CASCADE',  // If the user is deleted, remove the follow relationships
      allowNull: false,
    },
  }
);

module.exports = userFollows



