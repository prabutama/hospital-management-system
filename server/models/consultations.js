// models/consultations.js
module.exports = (sequelize, DataTypes) => {
  const Consultations = sequelize.define(
    "Consultations",
    {
      consultation_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      schedule_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ConsultationSchedule",
          key: "schedule_id",
        },
        onDelete: "CASCADE",
      },
      complaint: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      x_ray: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      x_ray_label: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      response: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
    },
    {
      tableName: "consultations",
      timestamps: false,
    }
  );

  Consultations.associate = function (models) {
    Consultations.belongsTo(models.ConsultationSchedule, {
      foreignKey: "schedule_id",
    });
    Consultations.hasOne(models.ConsultationLog, {
      foreignKey: "consultation_id",
      onDelete: "CASCADE",
    });
  };

  return Consultations;
};
