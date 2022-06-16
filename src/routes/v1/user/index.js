const { Router } = require('express');
const { logger, ...env } = require('../../../../config');
const errors = require('../../../utils/errors');

const auth = require('../../../middlewares/authenticator');
// const checkValidID = require('../../../middlewares/checkValidID');

const UserController = require('../../../controllers/User.controller');
const AuthController = require('../../../controllers/Auth.controller');

const rules = require('../../../validators');

// const EmailService = require('../../../services/providers/Email');
// const PaymentService = require('../../../services/providers/Payment');

const dependencies = {
  logger,
  env,
  errors,
  // EmailService,
  // PaymentService,
};
const router = new Router();

// // const testController = new TestController(dependencies);
const userController = new UserController(dependencies);
const authController = new AuthController(dependencies);

router.post(
  '/users/register',
  rules('register'),
  userController.register,
);
router.post(
  '/users/verifyemail',
  authController.verifyEmail,
);
router.post(
  '/users/login',
  rules('login'),
  authController.login,
);
router.post(
  '/users/forgotpassword',
  [auth.optionalTokenCheck, auth.verifyAllUserToken],
  rules('forgotPassword'),
  authController.forgotPassword,
);
router.post(
  '/users/resetpassword',
  [auth.optionalTokenCheck, auth.verifyAllUserToken],
  rules('resetPassword'),
  authController.resetPassword,
);
router.patch(
  '/users/changepassword',
  [auth.optionalTokenCheck, auth.verifyAllUserToken],
  rules('changePassword'),
  authController.changePassword,
);
router.get(
  '/users/:_id',
  [auth.optionalTokenCheck, auth.verifyAllUserToken],
  userController.getUser,
);
router.get(
  '/users/',
  [auth.optionalTokenCheck, auth.verifyAllUserToken, auth.verifySuperAdmin],
  userController.getAllUser,
);
router.delete(
  '/users/deleteuser/:_id',
  [auth.optionalTokenCheck, auth.verifyAllUserToken, auth.verifySuperAdmin],
  userController.deleteUser,
);
module.exports = router;
