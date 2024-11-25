// models/consultationSchedule.js
module.exports = (sequelize, DataTypes) => {
  const ConsultationSchedule = sequelize.define(
    "ConsultationSchedule",
    {
      schedule_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      dokter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "user_id",
        },
        onDelete: "CASCADE",
      },
      start_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {
      tableName: "consultation_schedule",
      timestamps: false,
    }
  );

  ConsultationSchedule.associate = function (models) {
    ConsultationSchedule.belongsTo(models.User, {
      foreignKey: "dokter_id",
      as: "Doctor",
    });
    ConsultationSchedule.hasOne(models.Consultations, {
      foreignKey: "schedule_id",
      onDelete: "CASCADE",
    });
  };

  return ConsultationSchedule;
};
