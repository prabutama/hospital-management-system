const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const checkRole = require("../middlewares/checkRole");
const { requestAppointment, getAppointmentsByDoctor, getAllAppointments } = require("../controllers/consultationController");

router.post("/", authenticateToken, checkRole(["patient"]), requestAppointment );
router.get("/list-appointment/:doctor_id", authenticateToken, checkRole(["doctor"]), getAppointmentsByDoctor );
router.get("/list-appointment/", authenticateToken, checkRole(["staff"]), getAllAppointments );

module.exports = router;
