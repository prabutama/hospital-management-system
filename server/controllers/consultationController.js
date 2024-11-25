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

exports.getAppointmentsByDoctor = async (req, res) => {
  try {
    const { doctor_id } = req.params; // Ambil `doctor_id` dari token yang sudah di-verify

    // Jika `doctor_id` tidak ditemukan, tampilkan pesan error
    if (!doctor_id) {
      return res.status(400).json({ message: "Doctor ID is missing or invalid" });
    }

    // Ambil janji temu yang sesuai dengan `doctor_id`
    const appointments = await Consultations.findAll({
      where: { dokter_id: doctor_id },
      include: [
        {
          model: User, // Pasien yang membuat janji temu
          as: 'pasien', 
          attributes: ['name'], // Hanya ambil nama pasien
        },
      ],
    });

    // Jika tidak ada janji temu ditemukan
    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found for this doctor" });
    }

    // Format respons sesuai permintaan
    const formattedAppointments = appointments.map(appointment => ({
      consultation_id: appointment.consultation_id,
      complaint: appointment.complaint,
      response: appointment.response,
      status: appointment.status,
      pasien: {
        name: appointment.pasien.name, // Nama pasien
      },
    }));

    res.status(200).json({
      message: "Appointments retrieved successfully",
      appointments: formattedAppointments,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


exports.getAllAppointments = async (req, res) => {
  try {
    // Ambil semua janji temu dari Consultations
    const appointments = await Consultations.findAll({
      include: [
        {
          model: User, // Pasien yang membuat janji temu
          as: 'pasien', 
          attributes: ['name'], // Hanya ambil nama pasien
        },
        {
          model: User, // Dokter yang menangani janji temu
          as: 'dokter',
          attributes: ['name'], // Hanya ambil nama dokter
        },
      ],
    });

    // Jika tidak ada janji temu ditemukan
    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }

    // Format respons sesuai permintaan
    const formattedAppointments = appointments.map(appointment => ({
      consultation_id: appointment.consultation_id,
      dokter: {
        name: appointment.dokter.name, // Nama dokter
      },
      pasien: {
        name: appointment.pasien.name, // Nama pasien
      },
      complaint: appointment.complaint, // Keluhan pasien
      status: appointment.status, // Status janji temu
    }));

    res.status(200).json({
      message: "Appointments retrieved successfully",
      appointments: formattedAppointments,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

