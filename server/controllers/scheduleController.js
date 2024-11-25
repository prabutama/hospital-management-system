const { ConsultationSchedule, User } = require("../models");
const moment = require("moment-timezone");
const bcrypt = require("bcrypt");

exports.createDoctorAndSchedule = async (req, res) => {
  const { doctor_name, email, password, start_time, end_time } = req.body;

  try {
    // Hash password sebelum menyimpan akun
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat akun dokter
    const doctor = await User.create({
      name: doctor_name,
      email,
      password: hashedPassword,
      role: "doctor",
    });

    // Validasi input waktu
    if (!start_time || !end_time) {
      return res.status(400).json({ message: "Start time and end time are required." });
    }

    if (!moment(start_time, "HH:mm:ss", true).isValid() || !moment(end_time, "HH:mm:ss", true).isValid()) {
      return res.status(400).json({ message: "Invalid time format. Expected HH:mm:ss." });
    }

    // Konversi waktu ke format Asia/Jakarta
    const startTimeWIB = moment.tz(start_time, "HH:mm:ss", "Asia/Jakarta").format("HH:mm:ss");
    const endTimeWIB = moment.tz(end_time, "HH:mm:ss", "Asia/Jakarta").format("HH:mm:ss");

    // Buat jadwal untuk dokter yang baru dibuat
    const schedule = await ConsultationSchedule.create({
      dokter_id: doctor.user_id,
      start_time: startTimeWIB,
      end_time: endTimeWIB,
    });

    // Berhasil
    res.status(201).json({
      message: "Doctor and consultation schedule created successfully.",
      doctor,
      schedule,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating doctor and schedule", error: error.message });
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



exports.updateScheduleByStaff = async (req, res) => {
  const { schedule_id } = req.params;
  const { doctor_name, start_time, end_time } = req.body;

  try {
    // Validasi input
    if (!start_time || !end_time) {
      return res.status(400).json({ message: "Start time and end time are required." });
    }

    if (!moment(start_time, "HH:mm:ss", true).isValid() || !moment(end_time, "HH:mm:ss", true).isValid()) {
      return res.status(400).json({ message: "Invalid time format. Expected HH:mm:ss." });
    }

    // Cari dokter
    const findDokter = await User.findOne({
      where: { name: doctor_name, role: "doctor" },
    });
    if (!findDokter) {
      return res.status(404).json({ message: "Dokter not found." });
    }

    // Konversi waktu ke Asia/Jakarta
    const startTimeWIB = moment.tz(start_time, "HH:mm:ss", "Asia/Jakarta").format("HH:mm:ss");
    const endTimeWIB = moment.tz(end_time, "HH:mm:ss", "Asia/Jakarta").format("HH:mm:ss");

    // Cari jadwal
    const schedule = await ConsultationSchedule.findByPk(schedule_id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    // Update jadwal
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
      where: { name: pasien_name, role: "patient" },
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
