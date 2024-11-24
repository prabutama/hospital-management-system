const express = require("express");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  logout,
} = require("../controllers/authController");
const authenticateToken = require("../middlewares/authenticateToken");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/logout", authenticateToken, logout);

module.exports = router;
