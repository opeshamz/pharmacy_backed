/* eslint-disable camelcase */
const { isEmpty } = require('lodash');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user.model');
const Auth = require('../models/auth.model');
const { successResponse, errorResponse } = require('../utils/responses');
// const { generateCode } = require('../utils/helpers');
// const { randomStringGen } = require('../utils/helpers');


class AuthController {
  constructor(dependencies = {}) {
    this.dependencies = dependencies;
    this.logger = this.dependencies.logger;
    this.e = this.dependencies.errors;
    // this.mail = this.dependencies.EmailService();
    this.secretKey = this.dependencies.env.SECRET;
    this.login = this.login.bind(this);
  }

  async login(req, res) {
    const { idMeta, password } = req.body;
    const auth = await Auth.findOne({ [idMeta.type]: idMeta.value })
      .populate({ path: 'user', populate: { path: 'preferences' } }).lean();
    if (isEmpty(auth)) {
      throw new this.e.UnauthorizedError('User not found. Please check your credentials');
    }
    const checkPassword = await bcrypt.compare(password, auth.password);
    if (!checkPassword) {
      this.logger.info(
        `User with phone_number ${auth.identifier} tried to sign in with a wrong password`,
      );
      throw new this.e.UnauthorizedError(
        'Account details supplied is incorrect, please check and try again',
      );
    }
    const response = { user_data: auth.user, token: null, expires: '7 days' };
    const token = this.constructor.generateToken(auth.user);
    response.token = token;
    this.logger.info(`User ${req.body.identifier} signed in successfully.`);
    return successResponse(res, 200, response, 'Login successful');
  }
}

module.exports = AuthController;
