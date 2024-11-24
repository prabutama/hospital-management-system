// models/consultationLog.js
module.exports = (sequelize, DataTypes) => {
  const ConsultationLog = sequelize.define(
    "ConsultationLog",
    {
      log_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      consultation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Consultations",
          key: "consultation_id",
        },
        onDelete: "CASCADE",
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
      pasien_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "user_id",
        },
        onDelete: "CASCADE",
      },
      response: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
    },
    {
      tableName: "consultation_log",
      timestamps: false,
    }
  );

  ConsultationLog.associate = function (models) {
    ConsultationLog.belongsTo(models.Consultations, {
      foreignKey: "consultation_id",
    });
    ConsultationLog.belongsTo(models.User, {
      foreignKey: "dokter_id",
      as: "Doctor",
    });
    ConsultationLog.belongsTo(models.User, {
      foreignKey: "pasien_id",
      as: "Patient",
    });
  };

  return ConsultationLog;
};
