const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Ini berarti 15 menit (15 = jumlah menit; 60 = jumlah detik dalam 1 menit; 1000 = jumlah milidetik dalam 1 detik)
  max: 100, // Ini berarti cuma 100 request per 15 menit
  message: "Request terlalu banyak. Coba lagi nanti",
});

module.exports = limiter;
