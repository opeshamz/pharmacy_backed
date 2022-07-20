/* eslint-disable quotes */
const Joi = require('joi');

// eslint-disable-next-line no-unused-vars
const { GENDER, USER_ROLES } = require('../utils/constants');

const requiredString = Joi.string().required();
// const requiredNumber = Joi.number().required();
// const mongoID = Joi.string().regex(/^[a-fA-F0-9]{24}$/);
const keys = (object) => Joi.object().keys(object);

exports.register = keys({
  email: requiredString.email().max(50).description("User's valid email address"),
  password: requiredString.min(8).max(50).description("User's password (8 min, 50 characters max)"),
  first_name: requiredString.max(50).description('User first name'),
  last_name: requiredString.max(50).description('User last name'),
  phone_number: requiredString.max(50).description('User phone number'),
  gender: requiredString,
});

exports.login = keys({
  email: requiredString.email().max(50).description("User's valid email address"),
  password: requiredString.min(8).max(50).description("User's password (8 min, 50 characters max)"),
});

exports.forgotPassword = keys({
  email: requiredString.email().max(50).description("User's valid email address"),
});

exports.resetPassword = keys({
  new_password: requiredString.min(8).max(50).description('User password (8 min, 50 characters max)'),
});

exports.changePassword = keys({
  email: requiredString.email().max(50).description("User's valid email address"),
  old_password: requiredString.min(8).max(50).description('User password (8 min, 50 characters max)'),
  new_password: requiredString.min(8).max(50).description('User password (8 min, 50 characters max)'),
});
