/* eslint-disable camelcase */
// const { isEmpty } = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
    this.verifyEmail = this.verifyEmail.bind(this);
  }

  // eslint-disable-next-line consistent-return
  async login(req, res) {
    const { email, password } = req.body;
    const auth = await Auth.findOne({ email }).populate('user').lean();
    if (!auth) {
      throw new this.e.UnauthorizedError('User does not exist, please sign up');
    }
    if (!auth.is_verified) {
      return errorResponse(res, 307, 'please verify your email to complete registration');
    }
    const checkPassword = await bcrypt.compare(password, auth.password);
    if (!checkPassword) {
      throw new this.e.UnauthorizedError('invalid password');
    }
    const { user } = auth;
    const token = jwt.sign(user, process.env.JWT_SEC, { expiresIn: '7d' });
    const response = { user_data: auth.user, token, expires: '7 days' };
    return successResponse(res, 200, response, 'user successfully logged in');
  }

  async verifyEmail(req, res) {
    const { token } = req.body;
    const authExist = await Auth.findOne({ token });
    if (!authExist) {
      throw new this.e.UnauthorizedError('User does not exist please register');
    }
    if (authExist.token !== token) {
      throw new this.e.UnauthorizedError('Invalid token, please check email for the right token');
    }
    if (authExist.is_verified) {
      return errorResponse(res, 307, 'Email already verified, please log in');
    }
    authExist.is_verified = true;
    authExist.token = null;
    await authExist.save();
    return successResponse(res, 200, {}, 'Email has been successfully verified');
  }

  // eslint-disable-next-line consistent-return
}
module.exports = AuthController;
