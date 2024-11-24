module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User", // Nama model
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("pasien", "dokter", "staff"),
        allowNull: false,
        defaultValue: "pasien",
      },
      resetPasswordToken: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "users",
      timestamps: false, // Disable createdAt and updatedAt
    }
  );

  User.associate = function (models) {
    // Definisikan relasi antar model di sini
    User.hasMany(models.ConsultationSchedule, {
      foreignKey: "dokter_id",
      as: "Schedules",
      onDelete: "CASCADE",
    });
  };

  return User;
};
