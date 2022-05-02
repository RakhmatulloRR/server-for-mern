// const users = [
//   { name: "name1", email: "email1@gmail.com", password: "Password1&123" },
//   { name: "name2", email: "email2@gmail.com", password: "Password2&123" },
// ];
const { mongoose, Joi, jwt, config } = require("../npm");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, index: true, unique: true },
  password: { type: String, required: true },
  isAdmin: Boolean,
});
// console.log(config.get("JWT_KEY"));
userSchema.methods.generateAuthToken = function () {
  // console.log(user)
  return jwt.sign({ _id: this.id, isAdmin: this.isAdmin }, config.get("JWT_KEY"));
};
const User = model("User", userSchema);
const validateUser = (user) => {
  const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    isAdmin: Joi.boolean().required(),
  });
  return userSchema.validate(user);
};
const validateAuth = (user) => {
  const userSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
  return userSchema.validate(user);
};

module.exports.User = User;
module.exports.validateUser = validateUser;
module.exports.validateAuth = validateAuth;
