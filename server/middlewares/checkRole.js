const { User } = require("../models");

const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Asumkan role juga ada di req.user

    if (allowedRoles.includes(userRole)) {
      next(); // Jika role sesuai, lanjutkan ke controller
    } else {
      return res.status(403).json({ message: "Access denied!" });
    }
  };
};

module.exports = checkRole;
