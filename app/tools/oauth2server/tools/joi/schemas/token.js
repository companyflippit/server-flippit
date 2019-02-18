const Joi = require('joi');
const { AppError } = require('error-delpinos').errors;

const tokenSchema = Joi
  .string()
  .regex(/^[0-9a-fA-F]{40}$/)
  .required();

const callback = (error, value) => {
  if (error) {
    throw new AppError(error.message, 400);
  }
  return value;
};

const tokenValidate = token => Joi.validate(token, tokenSchema, callback);

module.exports = {
  tokenValidate,
};
