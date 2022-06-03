/* eslint-disable quotes */
const Joi = require('joi');

// eslint-disable-next-line no-unused-vars
const { GENDER, USER_ROLES } = require('../utils/constants');

const requiredString = Joi.string().required();
// const mongoID = Joi.string().regex(/^[a-fA-F0-9]{24}$/);
const keys = (object) => Joi.object().keys(object);

exports.login = keys({
  email: requiredString.email().max(50).description("User's valid email address"),
  password: requiredString,
});
