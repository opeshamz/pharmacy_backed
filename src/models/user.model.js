/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable camelcase */
const { Schema, model } = require('mongoose');
const {
  DEFAULT_PROFILE_IMG, USER_STATUS, GENDER, RIDER_STATUS,
} = require('../utils/constants');

const userSchema = new Schema({
  first_name: {
    type: String,
    maxlength: 60,
    trim: true,
  },
  last_name: {
    type: String,
    maxlength: 60,
    required: true,
    trim: true,
  },
  phone_number: {
    type: String,
    maxlength: 15,
    // regex this later
    // validate: () {}
  },
  profile_img: {
    type: String,
    maxlength: 200,
    default: DEFAULT_PROFILE_IMG,
  },
  date_of_birth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: GENDER,
  },

  country: {
    type: String,
    default: 'NG',
  },
  user_type: {
    type: String,
    default: 'CUSTOMER',
  },
  role: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: 'ACTIVE',
    enum: USER_STATUS,
  },
  is_onboarded: {
    type: Boolean,
    default: false,
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });
module.exports = model('userModel', userSchema);
