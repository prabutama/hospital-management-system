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
  getAllUsersWithConsultationCount,
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
  "/doctor/:consultation_id",
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

router.get(
  "/user-count",
  authenticateToken,
  checkRole(["staff"]),
  getAllUsersWithConsultationCount
);

module.exports = router;
