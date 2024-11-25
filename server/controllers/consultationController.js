const { Consultations, User, ConsultationSchedule } = require("../models");

exports.requestAppointment = async (req, res) => {
  const { doctor_id, patient_id, complaint, schedule_id } = req.body;

  try {
    // Validasi dokter
    const dokter = await User.findOne({
      where: { user_id: doctor_id, role: "doctor" },
    });
    if (!dokter) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Validasi pasien
    const pasien = await User.findOne({
      where: { user_id: patient_id, role: "patient" },
    });
    if (!pasien) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Validasi jadwal konsultasi
    const schedule = await ConsultationSchedule.findOne({
      where: { schedule_id },
    });

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    // Cek apakah waktu saat ini berada dalam rentang waktu jadwal (start_time - end_time)
    const currentTime = new Date();
    const startTime = new Date(schedule.start_time);
    const endTime = new Date(schedule.end_time);

    if (currentTime < startTime || currentTime > endTime) {
      return res.status(400).json({
        message: "The consultation time is not valid. Please select a valid time.",
      });
    }

    // Buat konsultasi
    const consultation = await Consultations.create({
      dokter_id: doctor_id,
      pasien_id: patient_id,
      complaint,
      schedule_id,  // Menyimpan schedule_id ke dalam konsultasi
      status: "pending",
    });

    res.status(201).json({
      message: "Consultation request created successfully",
      consultation,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
