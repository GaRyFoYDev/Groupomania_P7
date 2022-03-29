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
      nom: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          isAlpha: true,
          notEmpty: true,
        },
      },
      prenom: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          isAlpha: true,
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
      mot_de_passe: {
        allowNull: false,
        type: Sequelize.STRING,
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
