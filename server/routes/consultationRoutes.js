const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const checkRole = require("../middlewares/checkRole");
const { requestAppointment } = require("../controllers/consultationController");

router.post("/", authenticateToken, checkRole(["patient"]), requestAppointment );

module.exports = router;
