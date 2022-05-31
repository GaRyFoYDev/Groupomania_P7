'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Post, Like, Comment}) {
      // define association here
      this.hasMany(Post, {foreignKey: 'userId'})
      this.hasMany(Comment, {foreignKey: 'userId'})
      this.hasMany(Like, {foreignKey: 'userId'})
    }

    toJSON(){
      return {...this.get(), id: undefined}
    }
  }
  User.init(
    {
      uuid :{
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,

      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      prenom: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        
      },
      role: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image :{
        type: DataTypes.STRING,
        allowNull: true,
      },
      image_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );
  return User;
};