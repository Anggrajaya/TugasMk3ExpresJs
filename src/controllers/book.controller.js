const Book = require("../models/book.model");
const sendResponse = require("../utils/sendResponse");

exports.getAllBuku = async (req, res) => {
  try {
    const books = await Book.getAll();
    return sendResponse(res, 200, true, "Buku berhasil didapatkan", books);
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, false, "Internal server error");
  }
};

exports.getBukuById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.getById(id);

    if (!book) {
      return sendResponse(res, 404, false, "Buku tidak ditemukan");
    }

    return sendResponse(res, 200, true, "Buku berhasil didapatkan", book);
  } catch (error) {
    console.error(error);

    switch (error.errno) {
      case 1292:
        return sendResponse(res, 404, false, "Buku tidak ditemukan");
    }

    return sendResponse(res, 500, false, "Internal server error");
  }
};

exports.tambahBuku = async (req, res) => {
  try {
    const newBook = await Book.tambah(req.body);
    return sendResponse(res, 201, true, "Buku berhasil ditambahkan", newBook);
  } catch (error) {
    console.error(error);

    switch (error.errno) {
      case 1452:
        return sendResponse( res, 400, false, "user_id atau category_id tidak valid");
    }
  }

  return sendResponse(res, 500, false, "Internal server error");
};

exports.updateBuku = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.update(id, req.body);

    if (!updatedBook) {
      return sendResponse(res, 404, false, "Buku tidak ditemukan");
    }

    return sendResponse(res, 200, true, "Buku berhasil di-update", updatedBook);
  } catch (error) {
    console.error(error);

    switch (error.errno) {
      case 1452:
        return sendResponse( res, 400, false, "user_id atau category_id tidak valid");
      case 1292:
        return sendResponse(res, 404, false, "Buku tidak ditemukan");
    }

    return sendResponse(res, 500, false, "Internal server error");
  }
};

exports.hapusBuku = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.hapus(id);

    if (!deletedBook) {
      return sendResponse(res, 404, false, "Buku tidak ditemukan");
    }

    return sendResponse(res, 200, true, "Buku berhasil dihapus");
  } catch (error) {
    console.error(error);

    switch (error.errno) {
      case 1452:
        return sendResponse( res, 400, false, "user_id atau category_id tidak valid");
      case 1292:
        return sendResponse(res, 404, false, "Buku tidak ditemukan");
    }

    return sendResponse(res, 500, false, "Internal server error");
  }
};
