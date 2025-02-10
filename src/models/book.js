const { pool } = require('../config/database');

class Book {  
  static getAll = async () => {
    const [rows] = await pool.query('SELECT * FROM books');

    return rows;
  }

  static getById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM books WHERE id = ?', [id]);

    return rows[0];
  }

  static add = async (book) => {
    const { title, writer, publisher, year, user_id, category_id } = book;
    const [result] = await pool.query(
      'INSERT INTO books (title, writer, publisher, year, user_id, category_id) VALUES (?, ?, ?, ?, ?, ?)',
      [title, writer, publisher, year, user_id, category_id]
    );

    return result.insertId;
  }

  static update = async (id, book) => {
    const { title, writer, publisher, year, user_id, category_id } = book;
    const [result] = await pool.query(
      'UPDATE books SET title = ?, writer = ?, publisher = ?, year = ?, user_id = ?, category_id = ? WHERE id = ?',
      [title, writer, publisher, year, user_id, category_id, id]
    );

    return result.affectedRows;
  }

  static delete = async (id) => {
    const [result] = await pool.query('DELETE FROM books WHERE id = ?', [id]);
    
    return result.affectedRows;
  }
}

module.exports = Book;