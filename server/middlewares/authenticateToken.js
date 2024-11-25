const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { TokenBlacklist } = require("../models");

// Promisify jwt.verify to use async/await
const verifyToken = promisify(jwt.verify);

const authenticateToken = async (req, res, next) => {
  try {
    // Ambil token dari header Authorization
    const token = req.headers?.authorization?.split(" ")[1]; // Optional chaining to safely get token

    // Jika token tidak ada, kembalikan error 401
    if (!token) {
      return res.status(401).json({ message: "Access denied! No token provided." });
    }

    // Cek apakah token ada dalam blacklist
    const [blacklistedToken, decoded] = await Promise.all([
      TokenBlacklist.findOne({ where: { token } }),
      verifyToken(token, process.env.SECRET_KEY),
    ]);

    // Jika token ada dalam blacklist, kembalikan error 401
    if (blacklistedToken) {
      return res.status(401).json({
        message: "Token has been blacklisted. Please login again.",
      });
    }

    // Jika token valid, set user info dari decoded token
    req.user = { id: decoded.id, email: decoded.email, role: decoded.role };

    // Lanjutkan ke middleware berikutnya
    next();
  } catch (error) {
    // Tangani error yang terjadi saat memverifikasi token
    console.error(error);
    res.status(403).json({ message: "Invalid token or expired" });
  }
};

module.exports = authenticateToken;
