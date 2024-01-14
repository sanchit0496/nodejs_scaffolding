const Joi = require('joi');

const createAdminSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  // Add additional fields and rules as needed
});

module.exports = {
  createAdminSchema,
};