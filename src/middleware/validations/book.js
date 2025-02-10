const { body, validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({
        success: false,
        message: errors.array().map((error) => error.msg),
      });
  }

  next();
};

const validateBookRequestBody = [
  body("title")
    .trim()
    .notEmpty().withMessage("title tidak boleh kosong")
    .isLength({ max: 255 }).withMessage("title tidak boleh melebihi 255 karakter")
    .escape(),

  body("writer")
    .trim()
    .notEmpty().withMessage("writer tidak boleh kosong")
    .isLength({ max: 255 }).withMessage("writer tidak boleh melebihi 255 karakter")
    .escape(),

  body("publisher")
    .trim()
    .notEmpty().withMessage("publisher tidak boleh kosong")
    .isLength({ max: 255 }).withMessage("publisher tidak boleh melebihi 255 karakter")
    .escape(),

  body("year")
    .notEmpty()
    .withMessage("year tidak boleh kosong")
    .isInt({ max: new Date().getFullYear() }).withMessage("value year tidak valid"),

  body("user_id")
    .optional()
    .isInt().withMessage("user_id harus berupa integer"),

  body("category_id")
    .notEmpty().withMessage("category_id tidak boleh kosong")
    .isInt().withMessage("category_id harus berupa integer"),

  validate,
];


module.exports = validateBookRequestBody;
