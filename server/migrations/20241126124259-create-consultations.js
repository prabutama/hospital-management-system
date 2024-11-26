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
      complaint: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      response: {
        type: Sequelize.STRING(300),
        allowNull: true, // Respons mungkin belum tersedia saat konsultasi dibuat
      },
      pasien_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Nama tabel user di database
          key: "user_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      dokter_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Nama tabel user di database
          key: "user_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      schedule_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "consultation_schedule", // Nama tabel consultation_schedule di database
          key: "schedule_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      status: {
        type: Sequelize.ENUM("pending", "accepted", "rejected"),
        allowNull: false,
        defaultValue: "pending",
      },
      consultation_date: {
        type: Sequelize.DATE,
        allowNull: false, // Tanggal konsultasi harus diisi
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Hapus ENUM terlebih dahulu untuk menghindari masalah
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_consultations_status";'
    );

    // Hapus tabel consultations
    await queryInterface.dropTable("consultations");
  },
};
