const Joi = require("joi");
const sendResponse = require("../utils/sendResponse");

const bookSchema = Joi.object({
  title: Joi.string().required(),
  writer: Joi.string().required(),
  publisher: Joi.string().required(),
  year: Joi.number().integer().max(9999).required(),
  user_id: Joi.number().required(),
  category_id: Joi.number().required(),
});

exports.validasiDataBuku = (req, res, next) => {
  const { error } = bookSchema.validate(req.body);

  if (error) {
    return sendResponse(res, 400, false, error.details[0].message);
  }

  next();
};

