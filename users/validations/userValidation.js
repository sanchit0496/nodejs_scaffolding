const Joi = require("joi")

const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  // Add other fields as necessary
});

module.exports = {
  createUserSchema,
};
