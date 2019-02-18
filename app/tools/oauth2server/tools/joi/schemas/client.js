const Joi = require('joi');
const { AppError } = require('error-delpinos').errors;

const schema = Joi.object().keys({
  name: Joi
    .string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  user: Joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});
const clientIdSchema = Joi
  .string()
  .regex(/^[0-9a-fA-F]{32}$/)
  .required();

const clientSecretSchema = Joi
  .string()
  .regex(/^[0-9a-fA-F]{64}$/)
  .required();

const callback = (error, value) => {
  if (error) {
    throw new AppError(error.message, 400);
  }
  return value;
};

const clientValidate = object => Joi
  .validate(object, schema, callback);

const clientIdValidate = clientId => Joi
  .validate(clientId, clientIdSchema, callback);

const clientSecretValidate = clientSecret => Joi
  .validate(clientSecret, clientSecretSchema, callback);

module.exports = {
  clientValidate,
  clientIdValidate,
  clientSecretValidate,
};
