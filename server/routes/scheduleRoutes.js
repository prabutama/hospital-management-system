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
  checkRole(["dokter", "pasien", "staff"]),
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
  checkRole(["dokter"]),
  updateScheduleByDoctor
);
router.put(
  "/pasien/:schedule_id",
  authenticateToken,
  checkRole(["pasien"]),
  updateScheduleByPatient
);
router.delete(
  "/:schedule_id",
  authenticateToken,
  checkRole(["staff"]),
  deleteSchedule
);

module.exports = router;
