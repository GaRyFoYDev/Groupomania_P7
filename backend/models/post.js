'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Like,Comment}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'userId', as: 'user'} );
      this.hasMany(Like, {foreignKey: 'postId', });
      this.hasMany(Comment, {foreignKey: 'postId'});

    }
    toJSON(){
     return {...this.get(), id: undefined, userId: undefined}
    }
  }
  Post.init({
    uuid :{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },    
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,   
    },
  }, {
    sequelize,
    tableName: 'posts',
    modelName: 'Post',
  });
  return Post;
};