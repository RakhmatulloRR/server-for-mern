const mongoose = require("mongoose");
const Joi = require('joi');
const { Schema, model } = mongoose;

const bookSchema = Schema({
  name: String,
  year: Number,
  isBestSeller: Boolean,
  author: {
    fn: String,
    ln: String,
  },
  date: {type: Date, default: Date.now}
});

const Book = model("Book", bookSchema);

function validateBook(name) {
  const bookSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    year: Joi.number().positive().integer().required(),
    isBestSeller: Joi.boolean().required(),
    author: Joi.object({
      fn: Joi.string().min(2).max(30).required(),
      ln: Joi.string().min(2).max(30).required(),
    }),
  });
  return bookSchema.validate(name);
}

module.exports.Book = Book
module.exports.validateBook = validateBook
