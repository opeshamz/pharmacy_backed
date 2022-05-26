/* eslint-disable quotes */
const Joi = require('joi');

// eslint-disable-next-line no-unused-vars
const { GENDER, USER_ROLES } = require('../utils/constants');

const requiredString = Joi.string().required();
const mongoID = Joi.string().regex(/^[a-fA-F0-9]{24}$/);
const keys = (object) => Joi.object().keys(object);

exports.createUser = keys({
  first_name: requiredString
    .max(60)
    .description("User's first name (60 characters max)"),
  last_name: requiredString
    .max(60)
    .description("User's last name (60 characters max)"),
  password: requiredString
    .min(8)
    .max(50)
    .description("User's password (8 min, 50 characters max)"),
  email: Joi.string().email().max(50).description("User's valid email address"),
  phone_number: requiredString.max(15).replace(/\D/g, '').pattern(/^234[0-9]/).messages({
    'string.pattern.base': 'Phone number must start with +234',
  })
    .description("User's valid phone number")
    .when('email', {
      not: Joi.exist(),
      then: Joi.required(),
    }),
  country: Joi.string().default('NG'),
  country_code: Joi.string().default('+234'),
  role: Joi.string()
    .default('CUSTOMER')
    .description('The role of the user to created'),
});

exports.createStaff = keys({
  first_name: requiredString
    .max(60)
    .description("User's first name (60 characters max)"),
  last_name: requiredString
    .max(60)
    .description("User's last name (60 characters max)"),
  password: Joi.string()
    .min(8)
    .max(50)
    .description("User's password (8 min, 50 characters max)"),
  email: Joi.string().email().max(50).description("User's valid email address"),
  phone_number: requiredString.max(15).replace(/\D/g, '').pattern(/^234[0-9]/).messages({
    'string.pattern.base': 'Phone number must start with +234',
  })
    .description("User's valid phone number")
    .when('email', {
      not: Joi.exist(),
      then: Joi.required(),
    }),
  country: Joi.string().default('NG'),
  state: Joi.string(),
  city: Joi.string(),
  profile_img: Joi.string(),
  gender: Joi.string().valid(...GENDER),
  store_id: mongoID.required().description('Store Id').when('role', {
    is: 'RIDER',
    then: Joi.optional(),
  }),
  country_code: Joi.string().default('+234'),
  role: Joi.string()
    .default('CUSTOMER')
    .description('The role of the user to created'),
});

exports.updateSettings = keys({
  sms_communication: Joi.boolean(),
  email_communication: Joi.boolean(),
  promotion_offers: Joi.boolean(),
  phone_communication: Joi.boolean(),
});
