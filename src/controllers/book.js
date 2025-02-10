const Book = require("../models/book");

class BookController {
  static index = async (req, res, next) => {
    try {
      const books = await Book.getAll();
      res.status(200).json({
        success: true,
        message: "Buku berhasil didapat",
        data: books,
      });
    } catch (error) {
      next(error);
    }
  };

  static show = async (req, res, next) => {
    try {
      const book = await Book.getById(req.params.id);

      if (!book) {
        return res.status(404).json({ success: false, message: "Buku tidak ditemukan" });
      }

      res.status(200).json({
        success: true,
        message: "Buku berhasil didapat",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  };

  static store = async (req, res, next) => {
    try {
      const newBookId = await Book.add(req.body);

      res.status(201).json({
        success: true,
        message: "Buku berhasil ditambah",
        data: { id: newBookId, ...req.body },
      });
    } catch (error) {
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({ success: false, message: "category_id atau user_id tidak valid" });
      }

      next(error);
    }
  };

  static update = async (req, res, next) => {
    try {
      const updated = await Book.update(req.params.id, req.body);

      if (!updated) {
        return res.status(404).json({ success: false, message: "Buku tidak ditemukan" });
      }

      res.status(200).json({
        success: true,
        message: "Buku berhasil di-update",
        data: { id: req.params.id, ...req.body },
      });
    } catch (error) {
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({ success: false, message: "category_id atau user_id tidak valid" });
      }

      next(error);
    }
  };

  static destroy = async (req, res, next) => {
    try {
      const deleted = await Book.delete(req.params.id);

      if (!deleted) {
        return res.status(404).json({ success: false, message: "Buku tidak ditemukan" });
      }

      res.status(200).json({ 
        success: true, 
        message: "Buku berhasil dihapus" 
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = BookController;
