const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const checkRole = require("../middlewares/checkRole");
const { getDoctor } = require("../controllers/consultationController");



module.exports = router;
