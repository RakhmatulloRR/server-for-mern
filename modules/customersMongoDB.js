const mongoose = require("mongoose");
const Joi = require('joi');
const { Schema, model } = mongoose;

const customerSchema = Schema({
  first_name: String,
  last_name: String,
  date_of_birth: String,
  email: String,
  job: String,
  country: String,
});

const Customer = model("Customer", customerSchema);

function validateCustomer(name) {
  const customerSchema = Joi.object({
    first_name: Joi.string().min(1).max(30).required(),
    last_name: Joi.string().min(1).max(30).required(),
    date_of_birth: Joi.string().min(1).max(30).required(),
    email: Joi.string().min(1).max(30).required(),
    job: Joi.string().min(1).max(30).required(),
    country: Joi.string().min(1).max(30).required(),
  });
  return customerSchema.validate(name);
}

module.exports.Customer = Customer
module.exports.validateCustomer = validateCustomer
