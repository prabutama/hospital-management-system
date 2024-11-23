const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.js")[
  process.env.NODE_ENV || "development"
];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false,
  }
);

const User = sequelize.define(
  "users",
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
      allowNull: true, // Bisa null jika tidak ada token reset yang aktif
    },
    resetPasswordExpires: {
      type: DataTypes.DATE, // Tipe tanggal untuk menyimpan waktu kedaluwarsa token
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: false, // Disable createdAt and updatedAt
  }
);

const TokenBlacklist = sequelize.define(
  "TokenBlacklist",
  {
    token: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    blacklistedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "token_blacklist",
    timestamps: false,
  }
);

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
        model: User,
        key: "user_id",
      },
      onDelete: "CASCADE",
    },
    pasien_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
      defaultValue: null,
      onDelete: "CASCADE",
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Tersedia", "Booked", "Selesai"),
      allowNull: false,
      defaultValue: "Tersedia",
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
        model: ConsultationSchedule,
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
        model: Consultations,
        key: "consultation_id",
      },
      onDelete: "CASCADE",
    },
    dokter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
      onDelete: "CASCADE",
    },
    pasien_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
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

// Relasi Antar Model
User.hasMany(ConsultationSchedule, {
  foreignKey: "dokter_id",
  as: "Schedules",
  onDelete: "CASCADE",
});
ConsultationSchedule.belongsTo(User, { foreignKey: "dokter_id", as: "Doctor" });

User.hasMany(ConsultationSchedule, {
  foreignKey: "pasien_id",
  as: "PatientSchedules",
  onDelete: "CASCADE",
});
ConsultationSchedule.belongsTo(User, {
  foreignKey: "pasien_id",
  as: "Patient",
});

ConsultationSchedule.hasOne(Consultations, {
  foreignKey: "schedule_id",
  onDelete: "CASCADE",
});
Consultations.belongsTo(ConsultationSchedule, { foreignKey: "schedule_id" });

Consultations.hasOne(ConsultationLog, {
  foreignKey: "consultation_id",
  onDelete: "CASCADE",
});
ConsultationLog.belongsTo(Consultations, { foreignKey: "consultation_id" });

User.hasMany(ConsultationLog, { foreignKey: "dokter_id", onDelete: "CASCADE" });
ConsultationLog.belongsTo(User, { foreignKey: "dokter_id", as: "Doctor" });

User.hasMany(ConsultationLog, { foreignKey: "pasien_id", onDelete: "CASCADE" });
ConsultationLog.belongsTo(User, { foreignKey: "pasien_id", as: "Patient" });

// Sinkronisasi Model dengan Database
sequelize.sync({ alter: true });

module.exports = {
  sequelize,
  User,
  TokenBlacklist,
  ConsultationSchedule,
  Consultations,
  ConsultationLog,
};
