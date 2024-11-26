"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("consultation_log", {
      log_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      consultation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "consultations", // Nama tabel consultations
          key: "consultation_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE", // Tambahkan onUpdate untuk menjaga relasi tetap sinkron
      },
      dokter_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Nama tabel users
          key: "user_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      pasien_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Nama tabel users
          key: "user_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      response: {
        type: Sequelize.STRING(300),
        allowNull: true, // Disesuaikan agar respons bisa nullable jika belum ada respons
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("consultation_log");
  },
};
