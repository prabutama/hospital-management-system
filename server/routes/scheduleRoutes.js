const express = require("express");
const router = express.Router();
const checkRole = require("../middlewares/checkRole");
const authenticateToken = require("../middlewares/authenticateToken");
const {
  createSchedule,
  getSchedules,
  deleteSchedule,
  updateScheduleByStaff,
  updateScheduleByDoctor,
  updateScheduleByPatient,
} = require("../controllers/scheduleController");

router.post("/", authenticateToken, checkRole(["staff"]), createSchedule);
router.get(
  "/",
  authenticateToken,
  checkRole(["doctor", "patient", "staff"]),
  getSchedules
);
router.put(
  "/staff/:schedule_id",
  authenticateToken,
  checkRole(["staff"]),
  updateScheduleByStaff
);
router.put(
  "/dokter/:schedule_id",
  authenticateToken,
  checkRole(["doctor"]),
  updateScheduleByDoctor
);
router.put(
  "/pasien/:schedule_id",
  authenticateToken,
  checkRole(["patient"]),
  updateScheduleByPatient
);
router.delete(
  "/:schedule_id",
  authenticateToken,
  checkRole(["staff"]),
  deleteSchedule
);

module.exports = router;
