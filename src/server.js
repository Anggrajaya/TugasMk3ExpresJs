require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./config/database");

// Middlewares
app.use(express.json());


// 1. READ semua data buku.
app.get("/api/books", (_, res) => {
  const sqlQuery = 'SELECT * FROM books';

  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: `Database error: ${err.message}.` });
    }
    res.json({
      message: "Berhasil mendapatkan semua data buku.",
      data: results,
    });
  });
});

// 2. READ data buku tertentu berdasarkan id buku.
app.get("/api/books/:idBuku", (req, res) => {
  const { idBuku } = req.params;

  const sqlQuery = `SELECT id, title, writer, publisher, year 
                     FROM books 
                     WHERE id = ?`;

  db.query(sqlQuery, [idBuku], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: `Database error: ${err.message}.` });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Buku tidak ditemukan." });
    }

    res.json({
      message: `Berhasil mendapatkan data buku dengan id ${idBuku}.`,
      data: results[0],
    });
  });
});

// 3. CREATE data buku berdasarkan id buku.
app.post("/api/books", (req, res) => {
  const { title, writer, publisher, year, user_id, category_id } = req.body;

  if (!title || !writer || !publisher || !year || !user_id || !category_id) {
    return res
      .status(400)
      .json({ message: "Masukkan semua nilai untuk semua field." });
  }

  const sqlQuery = `INSERT INTO books (title, writer, publisher, year, user_id, category_id) 
                     VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sqlQuery, [title, writer, publisher, year, user_id, category_id], (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: `Database error: ${err.message}.` });
      }
      res
        .status(201)
        .json({
          message: "Berhasil menambahkan buku.",
          idBuku: results.insertId,
        });
    }
  );
});

// 4. UPDATE data buku berdasarkan id buku.
app.put("/api/books/:idBuku", (req, res) => {
  const { idBuku } = req.params;
  const { title, writer, publisher, year, user_id, category_id } = req.body;

  if (!title || !writer || !publisher || !year || !user_id || !category_id) {
    return res
      .status(400)
      .json({ error: "Masukkan semua nilai untuk semua field." });
  }

  const sql = `UPDATE books 
                 SET title = ?, writer = ?, publisher = ?, year = ?, user_id = ?, category_id = ? 
                 WHERE id = ?`;

  db.query(
    sql,
    [title, writer, publisher, year, user_id, category_id, idBuku],
    (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: `Database error: ${err.message}.` });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Buku tidak ditemukan." });
      }
      res.json({ message: "Buku berhasil diperbarui." });
    }
  );
});

// 5. DELETE data buku berdasarkan id buku.
app.delete("/api/books/:idBuku", (req, res) => {
  const { idBuku } = req.params;

  const sqlQuery = `DELETE FROM books WHERE id = ?`;

  db.query(sqlQuery, [idBuku], (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: `Database error: ${err.message}.` });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Buku tidak ditemukan." });
    }
    res.json({ message: "Buku berhasil dihapus." });
  });
});

app.listen(PORT, () => {
  console.log(`Server berhasil dijalankan di port ${PORT}.`);
});
