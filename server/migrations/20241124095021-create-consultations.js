"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("consultations", {
      consultation_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      schedule_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "consultation_schedule",
          key: "schedule_id",
        },
        onDelete: "CASCADE",
      },
      complaint: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      x_ray: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      x_ray_label: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      response: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("consultations");
  },
};
