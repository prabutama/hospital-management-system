// models/tokenBlacklist.js
module.exports = (sequelize, DataTypes) => {
  const TokenBlacklist = sequelize.define(
    "TokenBlacklist",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
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

  return TokenBlacklist;
};
