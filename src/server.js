require("dotenv").config();
const helmet = require("helmet");
const express = require("express");
const bookRoutes = require("./routes/book");
const routeNotFoundHandler = require("./middleware/routeNotFoundHandler");
const errorHandler = require("./middleware/globalErrorHandler");
const limiter = require("./middleware/rateLimiter");
const db = require("./config/database");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", limiter);


// Routes
app.use("/api/books", bookRoutes);


// 404 route handling
app.all("*", routeNotFoundHandler);


// Global error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

db.authenticate()
  .then((_) => {
    console.log("Berhasil terkoneksi ke basis data");
    app.listen(PORT, () => console.log(`Server berhasil dijalankan di port ${PORT}`));
  })
  .catch((error) => {
    console.error("Gagal terkoneksi ke basis data:", error.message);
    process.exit(1);
  });
