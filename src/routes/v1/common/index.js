const { Router } = require('express');
const { logger, ...env } = require('../../../../config');
const errors = require('../../../utils/errors');

// const auth = require('../../../middlewares/authenticator');
// const checkValidID = require('../../../middlewares/checkValidID');
// const checkIDType = require('../../../middlewares/checkIdentifierType');
// const checkSlugOrID = require('../../../middlewares/checkSlugOrID');

const UserController = require('../../../controllers/User.controller');
// const AuthController = require('../../../controllers/Auth.controller');

// const rules = require('../../../validators');
// const {
//   verifyAllUserToken,
//   verifySuperAdmin,
//   optionalTokenCheck,
//   VerifyStoreAdmin, // eslint-disable-next-line no-unused-vars
//   checkIsSuperOrStoreAdmin,
// } = require('../../../middlewares/authenticator');
// const CheckPermission = require('../../../middlewares/accessControl');

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
const userController = new UserController(dependencies);
// const authController = new AuthController(dependencies);

router

  .post(
    '/users/register',
    userController.register,
  );
module.exports = router;
