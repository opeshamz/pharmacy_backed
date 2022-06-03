/* eslint-disable camelcase */
const { isEmpty } = require('lodash');
const User = require('../models/user.model');
const Auth = require('../models/auth.model');
const { successResponse, errorResponse } = require('../utils/responses');
const { generateCode } = require('../utils/helpers');

class UserController {
  constructor(dependencies = {}) {
    this.dependencies = dependencies;
    this.logger = this.dependencies.logger;
    this.e = this.dependencies.errors;
    // this.mail = this.dependencies.EmailService();
    this.secretKey = this.dependencies.env.SECRET;
    this.register = this.register.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  // eslint-disable-next-line consistent-return
  async register(req, res) {
    const { email } = req.body;
    const authExist = await Auth.findOne({ email }).lean();
    if (!isEmpty(authExist)) {
      if (authExist.email) {
        throw new this.e.UnauthorizedError('User already exist, please login');
      }
      if (!authExist.is_verified) {
        return errorResponse(res, 307, 'please verify your phone number to complete registration');
      }
    }
    const user = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
      gender: req.body.gender,
    });
    const email_verification_token = generateCode(6);
    await Auth.create({
      user: user._id,
      email: req.body.email,
      password: req.body.password,
      email_verification_token,
    });
    this.logger.info(
      `user profile: ${req.body.email} created sucessfully.`,
    );
    return successResponse(res, 201, {}, `Please check ${req.body.email} for verification code`);
  }
}
module.exports = UserController;
