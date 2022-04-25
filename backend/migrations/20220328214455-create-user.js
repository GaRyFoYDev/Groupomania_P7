"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid :{
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      nom: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
        },
      },
      prenom: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
        },
      },
      role: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      image :{
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
