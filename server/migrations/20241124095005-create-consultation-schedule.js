"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
    DO $$
    BEGIN
      -- Check if enum type exists
      IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_consultation_schedule_status') THEN
        -- Add missing enum values
        BEGIN
          -- Only add missing values if they don't exist in the enum
          IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'tersedia' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_consultation_schedule_status')) THEN
            ALTER TYPE "enum_consultation_schedule_status" ADD VALUE 'tersedia';
          END IF;

          IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'booked' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_consultation_schedule_status')) THEN
            ALTER TYPE "enum_consultation_schedule_status" ADD VALUE 'booked';
          END IF;

          IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'rejected' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_consultation_schedule_status')) THEN
            ALTER TYPE "enum_consultation_schedule_status" ADD VALUE 'rejected';
          END IF;

          IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'accepted' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_consultation_schedule_status')) THEN
            ALTER TYPE "enum_consultation_schedule_status" ADD VALUE 'accepted';
          END IF;

          IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'selesai' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_consultation_schedule_status')) THEN
            ALTER TYPE "enum_consultation_schedule_status" ADD VALUE 'selesai';
          END IF;
        END;
      ELSE
        -- If the enum type doesn't exist, create it
        CREATE TYPE "enum_consultation_schedule_status" AS ENUM (
          'tersedia', 
          'booked', 
          'rejected', 
          'accepted', 
          'selesai'
        );
      END IF;
    END;
    $$;
  `);
    await queryInterface.createTable("consultation_schedule", {
      schedule_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      dokter_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
        onDelete: "CASCADE",
      },
      pasien_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(
          "tersedia",
          "booked",
          "rejected",
          "accepted",
          "selesai"
        ),
        allowNull: false,
        defaultValue: "tersedia",
      },
      start_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      end_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("consultation_schedule");
  },
};
