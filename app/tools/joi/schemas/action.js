const Joi = require('joi');
const { AppError } = require('error-delpinos').errors;

const actionSchema = Joi.object().keys({
  action: Joi
    .string()
    .required(),
  web: Joi
    .string()
    .required(),
  email: Joi
    .string()
    .email()
    .required(),
});

const callback = (error, value) => {
  if (error) {
    throw new AppError(error.message, 400);
  }
  return value;
};

const actionValidate = object => Joi.validate(object, actionSchema, callback);

module.exports = {
  actionValidate,
};
