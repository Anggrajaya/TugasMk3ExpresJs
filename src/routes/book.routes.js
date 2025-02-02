const express = require("express");
const bookController = require("../controllers/book.controller");
const { validasiDataBuku } = require("../middlewares/book.validator");

const router = express.Router();

router.get("/", bookController.getAllBuku);
router.get("/:id", bookController.getBukuById);
router.post("/", validasiDataBuku, bookController.tambahBuku);
router.put("/:id", validasiDataBuku, bookController.updateBuku);
router.delete("/:id", bookController.hapusBuku);

module.exports = router;
