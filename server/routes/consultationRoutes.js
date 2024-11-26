const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const checkRole = require("../middlewares/checkRole");
const {
  requestAppointment,
  getAppointmentsByDoctor,
  getAllAppointments,
  getAppointmentsByPatient,
  responseAppointments,
  updateRequestAppointment,
  deleteAppointments,
} = require("../controllers/consultationController");

router.post("/", authenticateToken, checkRole(["patient"]), requestAppointment);
router.get(
  "/list-appointment/:doctor_id",
  authenticateToken,
  checkRole(["doctor"]),
  getAppointmentsByDoctor
);
router.get(
  "/list-appointment/patient/:patient_id",
  authenticateToken,
  checkRole(["patient"]),
  getAppointmentsByPatient
);
router.get(
  "/list-appointment/",
  authenticateToken,
  checkRole(["staff"]),
  getAllAppointments
);
router.put(
  "/doctor/:appointment_id",
  authenticateToken,
  checkRole(["doctor"]),
  responseAppointments
);
router.put(
  "/patient/:appointment_id",
  authenticateToken,
  checkRole(["patient"]),
  updateRequestAppointment
);
router.delete(
  "/:appointment_id",
  authenticateToken,
  checkRole(["staff"]),
  deleteAppointments
);

module.exports = router;
