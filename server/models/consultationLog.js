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
          model: "consultations", // Nama tabel consultations
          key: "consultation_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      dokter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Nama tabel user
          key: "user_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      pasien_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Nama tabel user
          key: "user_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      response: {
        type: DataTypes.STRING(300),
        allowNull: true, // Respons bisa kosong pada awalnya
      },
    },
    {
      tableName: "consultation_log",
      timestamps: false,
    }
  );

  ConsultationLog.associate = function (models) {
    // Relasi ke Consultations
    ConsultationLog.belongsTo(models.Consultations, {
      foreignKey: "consultation_id",
      as: "Consultation",
    });

    // Relasi ke User sebagai Dokter
    ConsultationLog.belongsTo(models.User, {
      foreignKey: "dokter_id",
      as: "Doctor",
    });

    // Relasi ke User sebagai Pasien
    ConsultationLog.belongsTo(models.User, {
      foreignKey: "pasien_id",
      as: "Patient",
    });
  };

  return ConsultationLog;
};
