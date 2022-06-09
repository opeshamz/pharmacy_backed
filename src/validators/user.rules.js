/* eslint-disable quotes */
const Joi = require('joi');

// eslint-disable-next-line no-unused-vars
const { GENDER, USER_ROLES } = require('../utils/constants');

const requiredString = Joi.string().required();
// const mongoID = Joi.string().regex(/^[a-fA-F0-9]{24}$/);
const keys = (object) => Joi.object().keys(object);

exports.register = keys({
  email: requiredString.email().max(50).description("User's valid email address"),
  password: requiredString,
  first_name: requiredString.max(50).description('User first name'),
  last_name: requiredString.max(50).description('User last name'),
  phone_number: requiredString.max(50).description('User phone number'),
});

exports.login = keys({
  email: requiredString.email().max(50).description("User's valid email address"),
  password: requiredString,
});
