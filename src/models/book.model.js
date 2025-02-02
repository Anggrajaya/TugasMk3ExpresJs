const db = require(`../config/database`);

const namaTabel = 'books';

class Book {
  static async getAll() {
    const [rows] = await db.query(`SELECT * FROM ${namaTabel}`);

    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query(`SELECT * FROM ${namaTabel} WHERE id = ?`, [id]);

    return rows[0] || null;
  }

  static async tambah(book) {
    const { title, writer, user_id, category_id, publisher, year } = book;
    const [result] = await db.query(
      `INSERT INTO ${namaTabel} (title, writer, user_id, category_id, publisher, year) VALUES (?, ?, ?, ?, ?, ?)`,
      [title, writer, user_id, category_id, publisher, year]
    );

    return { id: result.insertId, ...book };
  }

  static async update(id, book) {
    const { title, writer, user_id, category_id, publisher, year } = book;
    const [result] = await db.query(
      `UPDATE ${namaTabel} SET title = ?, writer = ?, user_id = ?, category_id = ?, publisher = ?, year = ? WHERE id = ?`,
      [title, writer, user_id, category_id, publisher, year, id]
    );

    return result.affectedRows > 0 ? { id, ...book } : null;
  }

  static async hapus(id) {
    const [result] = await db.query(`DELETE FROM ${namaTabel} WHERE id = ?`, [id]);

    return result.affectedRows > 0;
  }
}

module.exports = Book;
