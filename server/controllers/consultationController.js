const { User } = require("../models");

exports.getDoctor = async (req, res) => {
  try {
    // Query semua pengguna dengan role "dokter"
    const doctors = await User.findAll({ where: { role: "doctor" } });

    // Formatkan hasil menjadi array objek yang berisi id dan name
    const doctorList = doctors.map(doctor => ({
      id: doctor.user_id,
      name: doctor.name,
    }));

    // Kirim respons dengan daftar dokter
    res.json({
      message: "List of doctors",
      doctors: doctorList,
    });
  } catch (error) {
    // Tangani error jika terjadi
    res.status(500).json({ 
      message: "Internal server error", 
      error: error.message 
    });
  }
};
