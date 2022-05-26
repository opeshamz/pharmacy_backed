const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../../config');

const AuthModelSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
  },
  phone_number: {
    type: String,
    unique: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  password: {
    type: String,
    default: null,
  },
  old_passwords: [
    {
      type: String,
      default: [],
    },
  ],
  email_verification: {
    token: {
      type: String,
      default: null,
    },
    expires: {
      type: Number,
      default: 0,
    },
    status: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
    },
    attempts: {
      type: Number,
      default: 0,
    },
  },
  sms_verification: {
    token: {
      type: String,
      default: null,
    },
    expires: {
      type: Number,
      default: 0,
    },
    status: {
      type: Boolean,
      default: false,
    },
    attempts: {
      type: Number,
      default: 0,
    },
  },
  reset_password: {
    token: {
      type: String,
      default: null,
    },
    expires: {
      type: Number,
      default: 0,
    },
    code: {
      type: String,
    },
  },
  is_suspended: {
    type: Boolean,
    default: false,
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
  is_pre_verified: { // If atleast email or password is verified
    type: Boolean,
    default: false,
  },
  temp_token: {
    type: String,
  },

  is_merchant: {
    type: Boolean,
  },
  device_identifier: {
    type: String,
    default: null,
  },
  device_meta: {
    type: Schema.Types.Mixed,
  },
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

AuthModelSchema.index({ user: 1, phone_number: 1, email: 1 });

// eslint-disable-next-line func-names
AuthModelSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  this.password = bcrypt.hashSync(this.password, parseInt(SALT_ROUNDS, 10));
  return next();
});

module.exports = model('auths', AuthModelSchema);
