const express = require("express");
const router = express.Router();
const BookController = require("../controllers/book");
const validateBookRequestBody = require("../middleware/validations/book");

router.route("/")
  .get(BookController.index)
  .post(validateBookRequestBody, BookController.store);

router.route("/:id")
  .get(BookController.show)
  .put(validateBookRequestBody, BookController.update)
  .delete(BookController.destroy);

module.exports = router;
