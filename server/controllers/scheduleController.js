const { ConsultationSchedule, User } = require("../models");
const moment = require("moment-timezone");

exports.createSchedule = async (req, res) => {
  const { dokter_name, start_time, end_time } = req.body;  

  try {
    const findDokter = await User.findOne({
      where: { name: dokter_name, role: "dokter" },
    });

    if (!findDokter) {
      return res.status(404).json({ message: "Dokter not found." });
    }

    const startTimeWIB = moment
      .tz(start_time, "HH:mm", "Asia/Jakarta")
      .format("HH:mm");
    const endTimeWIB = moment
      .tz(end_time, "HH:mm", "Asia/Jakarta")
      .format("HH:mm");

    const schedule = await ConsultationSchedule.create({
      dokter_id: findDokter.user_id,
      start_time: startTimeWIB,
      end_time: endTimeWIB,
    });

    res.status(201).json({
      message: "Consultation Schedule creating successfully.",
      schedule,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating schedule", error: error.message });
  }
};

exports.getSchedules = async (req, res) => {
  try {
    // Menarik jadwal konsultasi dan informasi nama dokter
    let schedules = await ConsultationSchedule.findAll({
      include: [{
        model: User,        // Model User yang terhubung dengan ConsultationSchedule
        as: 'Doctor',       // Menggunakan alias 'Doctor' yang sudah didefinisikan
        attributes: ['name'], // Mengambil kolom 'name' dari dokter
      }]
    });

    // Mengembalikan response dengan jadwal dan nama dokter
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};



// Update Schedule by Staff Function
exports.updateScheduleByStaff = async (req, res) => {
  const { schedule_id } = req.params;
  const { dokter_name, start_time, end_time } = req.body;

  try {
    const findDokter = await User.findOne({
      where: { name: dokter_name, role: "dokter" },
    });

    if (!findDokter) {
      return res.status(404).json({ message: "Dokter not found." });
    }

    const startTimeWIB = moment.tz(start_time, "Asia/Jakarta").format("HH:mm");
    const endTimeWIB = moment.tz(end_time, "Asia/Jakarta").format("HH:mm");

    const schedule = await ConsultationSchedule.findByPk(schedule_id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    schedule.dokter_id = findDokter.user_id;
    schedule.start_time = startTimeWIB;
    schedule.end_time = endTimeWIB;
    await schedule.save();

    res.json({ message: "Consultation schedule updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.updateScheduleByDoctor = async (req, res) => {
  const { schedule_id } = req.params;
  const { status } = req.body;

  const validStatus = ["rejected", "accepted", "selesai"];
  if (!validStatus.includes(status)) {
    return res.status(400).json({
      message:
        "Invalid status. Allowed values are 'rejected', 'accepted', 'selesai'.",
    });
  }

  try {
    const schedule = await ConsultationSchedule.findByPk(schedule_id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    schedule.status = status;
    await schedule.save();

    res.json({ message: "Consultation schedule updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.updateScheduleByPatient = async (req, res) => {
  const { schedule_id } = req.params;
  const { pasien_name, status } = req.body;

  const validStatus = ["booked", "rejected"];
  if (!validStatus.includes(status)) {
    return res.status(400).json({
      message: "Invalid status. Allowed values are 'booked', 'rejected'.",
    });
  }

  try {
    const findPasien = await User.findOne({
      where: { name: pasien_name, role: "pasien" },
    });

    if (!findPasien) {
      return res.status(404).json({ message: "Pasien not found." });
    }

    const schedule = await ConsultationSchedule.findByPk(schedule_id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    schedule.pasien_id = findPasien.user_id;
    schedule.status = status;
    await schedule.save();

    res.json({ message: "Consultation schedule updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.deleteSchedule = async (req, res) => {
  const { schedule_id } = req.params;

  try {
    const schedule = await ConsultationSchedule.findByPk(schedule_id);
    if (!schedule) {
      return res
        .status(404)
        .json({ message: "Consultation schedule not found" });
    }
    await schedule.destroy();
    res.json({ message: "Consultation schedule deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
