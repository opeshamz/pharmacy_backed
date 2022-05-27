const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../../config');

const AuthModelSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  password: String,
  old_passwords: [
    {
      type: String,
      default: [],
    },
  ],
  email_verification_token: Number,
  email_token_expiry: Date,
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
  is_deleted: {
    type: Boolean,
    default: false,
  },
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// eslint-disable-next-line func-names
AuthModelSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  this.password = bcrypt.hashSync(this.password, parseInt(SALT_ROUNDS, 10));
  return next();
});

module.exports = model('auths', AuthModelSchema);
