module.exports = (sequelize, DataTypes) => {
  const Consultations = sequelize.define(
    "Consultations",
    {
      consultation_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      complaint: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      response: {
        type: DataTypes.STRING(300),
        allowNull: true, // Respons mungkin belum tersedia saat konsultasi dibuat
      },
      pasien_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dokter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      schedule_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "consultation_schedule", // Tabel yang mengandung jadwal konsultasi
          key: "schedule_id", // Kolom yang menjadi foreign key
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      status: {
        type: DataTypes.ENUM("pending", "accepted", "rejected"),
        allowNull: false,
        defaultValue: "pending",
      },
    },
    {
      tableName: "consultations",
      timestamps: false,
    }
  );

  Consultations.associate = function (models) {
    // Relasi ke ConsultationLog
    Consultations.hasOne(models.ConsultationLog, {
      foreignKey: "consultation_id",
      onDelete: "CASCADE",
    });

    // Relasi ke Pasien (User dengan role pasien)
    Consultations.belongsTo(models.User, {
      as: "pasien",
      foreignKey: "pasien_id",
    });

    // Relasi ke Dokter (User dengan role dokter)
    Consultations.belongsTo(models.User, {
      as: "dokter",
      foreignKey: "dokter_id",
    });

    // Relasi ke Jadwal Konsultasi (ConsultationSchedule)
    Consultations.belongsTo(models.ConsultationSchedule, {
      foreignKey: "schedule_id",
    });
  };

  return Consultations;
};
