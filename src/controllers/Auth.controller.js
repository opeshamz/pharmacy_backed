/* eslint-disable camelcase */
// const { isEmpty } = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { AuthTokenPromotionContext } = require('twilio/lib/rest/accounts/v1/authTokenPromotion');
// const User = require('../models/user.model');
const Auth = require('../models/auth.model');
const { successResponse, errorResponse } = require('../utils/responses');
const { generateCode } = require('../utils/helpers');
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
    this.forgotPassword = this.forgotPassword.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.changePassword = this.changePassword.bind(this);
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
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' });
    const response = { user_data: auth.user, token, expires: '7 days' };
    return successResponse(res, 200, response, 'user successfully logged in');
  }

  async forgotPassword(req, res) {
    const { email } = req.body;
    const auth = await Auth.findOne({ email });
    if (!auth) {
      throw new this.e.UnauthorizedError('User does not exist, please sign up');
    }
    const token = generateCode(6);
    auth.token = token;
    await auth.save();
    if (!token) {
      throw new this.e.BadRequestError('Incorrect token, please check you email for the right token');
    }
    return successResponse(res, 200, {}, 'Please check your email for password reset token');
  }

  async resetPassword(req, res) {
    const { token, new_password } = req.body;
    const auth = await Auth.findOne({ token });
    if (!auth) {
      throw new this.e.UnauthorizedError('Incorrect token ,please check you email for the right token');
    }
    auth.password = new_password;
    await auth.save();
    return successResponse(res, 200, {}, 'Password has been successfully reset');
  }

  // eslint-disable-next-line consistent-return
  async changePassword(req, res) {
    const { email, old_password, new_password } = req.body;
    const auth = await Auth.findOne({ email });
    if (!auth) {
      throw new this.e.UnauthorizedError('User does not exist, please sign up');
    }
    const checkPassword = await bcrypt.compare(old_password, auth.password);
    if (!checkPassword) {
      throw new this.e.UnauthorizedError('Old password is incorrect');
    }
    if (old_password === new_password) {
      throw new this.e.UnauthorizedError('Old password and new password should not be the same');
    }
    if (old_password !== new_password) {
      await auth.save();
      return successResponse(res, 200, {}, 'Password has been successfully changed');
    }
  }
}
module.exports = AuthController;
