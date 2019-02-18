const Joi = require('joi');
const { AppError } = require('error-delpinos').errors;
// TODO: enum of all the scopes;
const schema = Joi.object().keys({
  username: Joi
    .string()
    .min(5)
    .max(50)
    .optional(),
  password: Joi
    .string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  confirmPassword: Joi
    .string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  email: Joi
    .string()
    .email()
    .required(),
  scope: Joi
    .string()
    .alphanum()
    .min(3)
    .max(30)
    .optional(),
});

const usernameSchema = Joi
  .string()
  .min(5)
  .max(50)
  .required()
  .label('username field must be an alphanumeric string with a minimum of three characters and a maximum of 30');

const passwordSchema = Joi
  .string()
  .regex(/^[a-zA-Z0-9]{3,30}$/)
  .required()
  .label('password field must be an alphanumeric string with a minimum of three characters and a maximum of 30');

const emailSchema = Joi.object().keys({
  email: Joi
    .string()
    .email()
    .required(),
});

const resetPasswordSchema = Joi.object().keys({
  username: Joi
    .string()
    .min(3)
    .max(30)
    .required(),
  password: Joi
    .string()
    .alphanum()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  confirmPassword: Joi
    .string()
    .alphanum()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  resetToken: Joi
    .string()
    .required(),
});

const editUserSchema = Joi.object().keys({
  name: Joi
    .string()
    .min(3)
    .max(30)
    .optional(),
  username: Joi
    .string()
    .min(3)
    .max(30)
    .required(),
  email: Joi
    .string()
    .email()
    .required(),
  phone: Joi
    .optional(),
  code: Joi
    .optional(),
  validationCode: Joi
    .optional(),
});
const validationCodeSchema = Joi.object().keys({
  validationCode: Joi
    .string()
    .min(5)
    .max(5)
    .required(),
});

const callback = (error, value) => {
  if (error) {
    throw new AppError(error.message, 400);
  }
  return value;
};

const createUserValidate = object => Joi.validate(object, schema, callback);
const usernameValidate = username => Joi.validate(username, usernameSchema, callback);
const passwordValidate = password => Joi.validate(password, passwordSchema, callback);
const emailValidate = object => Joi.validate(object, emailSchema, callback);
const resetPasswordValidate = object => Joi.validate(object, resetPasswordSchema, callback);
const editUserValidate = object => Joi.validate(object, editUserSchema, callback);
const validationCodeValidate = object => Joi.validate(object, validationCodeSchema, callback);

module.exports = {
  createUserValidate,
  usernameValidate,
  passwordValidate,
  emailValidate,
  resetPasswordValidate,
  editUserValidate,
  validationCodeValidate,
};
