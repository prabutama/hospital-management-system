const { Consultations, User, ConsultationSchedule, sequelize } = require("../models");
const { Op } = require("sequelize");
const { format } = require("date-fns");
const { where } = require("sequelize");


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
        message:
          "The consultation time is not valid. Please select a valid time.",
      });
    }

    // Buat konsultasi dengan `consultation_date` diatur ke tanggal saat ini
    const consultation = await Consultations.create({
      dokter_id: doctor_id,
      pasien_id: patient_id,
      complaint: complaint,
      schedule_id: schedule_id, // Menyimpan schedule_id ke dalam konsultasi
      status: "pending",
      consultation_date: new Date(), // Menyimpan tanggal saat ini
    });

    // Format tanggal untuk respons
    const formattedDate = format(
      new Date(consultation.consultation_date),
      "dd MMMM yyyy, hh:mm a"
    );

    res.status(201).json({
      message: "Consultation request created successfully",
      consultation: {
        ...consultation.toJSON(), // Konversi instance Sequelize ke JSON
        consultation_date: formattedDate, // Ganti format tanggal dengan format yang bagus
      },
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
      return res
        .status(400)
        .json({ message: "Doctor ID is missing or invalid" });
    }

    // Ambil janji temu yang sesuai dengan `doctor_id`
    const appointments = await Consultations.findAll({
      where: { dokter_id: doctor_id },
      include: [
        {
          model: User, // Pasien yang membuat janji temu
          as: "pasien",
          attributes: ["name"], // Hanya ambil nama pasien
        },
      ],
    });

    // Jika tidak ada janji temu ditemukan
    if (!appointments || appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments found for this doctor" });
    }

    // Format respons sesuai permintaan
    const formattedAppointments = appointments.map((appointment) => ({
      consultation_id: appointment.consultation_id,
      complaint: appointment.complaint,
      response: appointment.response,
      status: appointment.status,
      date: format(
        new Date(appointment.consultation_date),
        "dd MMMM yyyy, hh:mm a"
      ),
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
exports.getAppointmentsByPatient = async (req, res) => {
  try {
    const { patient_id } = req.params; // Ambil `patient_id` dari parameter request

    // Validasi `patient_id`
    if (!patient_id) {
      return res
        .status(400)
        .json({ message: "Patient ID is missing or invalid" });
    }

    // Ambil janji temu yang sesuai dengan `patient_id`
    const appointments = await Consultations.findAll({
      where: { pasien_id: patient_id },
      include: [
        {
          model: User, // Asosiasikan dengan model User
          as: "dokter", // Pastikan alias sesuai dengan definisi asosiasi
          attributes: ["name"], // Ambil hanya atribut `name`
        },
      ],
    });

    // Jika tidak ada janji temu ditemukan
    if (!appointments || appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments found for this patient" });
    }

    // Format respons sesuai permintaan
    const formattedAppointments = appointments.map((appointment) => ({
      consultation_id: appointment.id, // Pastikan atribut ini benar
      complaint: appointment.complaint,
      response: appointment.response,
      status: appointment.status,
      date: format(
        new Date(appointment.consultation_date),
        "dd MMMM yyyy, hh:mm a"
      ),
      doctor: {
        name: appointment.dokter?.name || "Unknown", // Tangani jika `doctor` tidak ditemukan
      },
    }));

    // Kirimkan respons sukses
    res.status(200).json({
      message: "Appointments retrieved successfully",
      appointments: formattedAppointments,
    });
  } catch (error) {
    console.error("Error retrieving appointments:", error.message);
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
          as: "pasien",
          attributes: ["name"], // Hanya ambil nama pasien
        },
        {
          model: User, // Dokter yang menangani janji temu
          as: "dokter",
          attributes: ["name"], // Hanya ambil nama dokter
        },
      ],
    });

    // Jika tidak ada janji temu ditemukan
    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }

    // Format respons sesuai permintaan
    const formattedAppointments = appointments.map((appointment) => ({
      consultation_id: appointment.consultation_id,
      dokter: {
        name: appointment.dokter.name, // Nama dokter
      },
      pasien: {
        name: appointment.pasien.name, // Nama pasien
      },
      complaint: appointment.complaint, // Keluhan pasien
      date: format(
        new Date(appointment.consultation_date),
        "dd MMMM yyyy, hh:mm a"
      ),
      status: appointment.status,
      response: appointment.response,
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

exports.updateRequestAppointment = async (req, res) => {
  const { consultation_id } = req.params;
  const { complaint, status } = req.body;

  try {
    const appointment = Consultations.findOne({
      where: { consultation_id: consultation_id },
    });
    if (!appointment) {
      return res.status(404).json({ message: "No appointment found" });
    }

    const statusCanceled = "canceled";
    if (statusCanceled.includes(status)) {
      appointment.destroy();
      return res.json({ message: "Appointment has been canceled" });
    }

    appointment.complaint = complaint;
    appointment.save();
    res.json({ message: "Appointment updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.responseAppointments = async (req, res) => {
  const { consultation_id } = req.params;
  const { response, status } = req.body;

  const validStatus = ["accepted", "rejected"];
  if (!validStatus.includes(status)) {
    return res.status(400).json({
      message: "Invalid status. Allowed value are 'accepted' or 'rejected'",
    });
  }

  try {
    const appointment = await Consultations.findOne({ where: { consultation_id: consultation_id } });
    if (!appointment) {
      return res.status(404).json({ message: "No appointment found" });
    }

    appointment.response = response;
    appointment.status = status;
    await appointment.save();



    res.json({ message: "Appointment update successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.deleteAppointments = async (req, res) => {
  const { consultation_id } = req.params;

  try {
    const appointment = Consultations.findOne({
      where: { consultation_id: consultation_id },
    });
    if (!appointment) {
      return res.status(404).status({ message: "No appointment found" });
    }

    appointment.destroy();
    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getAllUsersWithConsultationCount = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        role: "patient", 
      },
      attributes: [
        "user_id",
        "name",
        "email",
        "role",
        [
          sequelize.fn("COUNT", sequelize.col("consultations.consultation_id")), // Menghitung jumlah konsultasi
          "consultation_count", // Alias untuk menghitung jumlah konsultasi
        ],
      ],
      include: [
        {
          model: Consultations,
          as: "consultations",  // Menggunakan alias 'consultations' sesuai asosiasi
          attributes: [],        // Tidak mengambil data lain dari tabel Consultations
        },
      ],
      group: ["User.user_id"], // Kelompokkan hasil berdasarkan user_id
      raw: true,  // Menggunakan raw query untuk hasil yang lebih sederhana
    });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    console.error("Error retrieving users with consultation count:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

