require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const bookRoutes = require("./routes/book.routes");

const PORT = process.env.PORT || 5000;

const app = express();

// top level middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


app.use("/api/books", bookRoutes);

app.listen(PORT, () =>
  console.log(`Server berhasil dijalankan di port ${PORT}.`)
);
