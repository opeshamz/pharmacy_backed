const { Router } = require('express');
const { logger, ...env } = require('../../../../config');
const errors = require('../../../utils/errors');

// const auth = require('../../../middlewares/authenticator');
// const checkValidID = require('../../../middlewares/checkValidID');
// const checkIDType = require('../../../middlewares/checkIdentifierType');
// const checkSlugOrID = require('../../../middlewares/checkSlugOrID');

// eslint-disable-next-line import/no-unresolved
const CategoryController = require('../../../controllers/Category.controller');
// const SubCategoryController = require('../../../controllers/Sub_category.controller');
// const AuthController = require('../../../controllers/Auth.controller');

// const rules = require('../../../validators');
// const {
// verifyAllUserToken,
// verifySuperAdmin,
// optionalTokenCheck,
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
const categoryController = new CategoryController(dependencies);

// const authController = new AuthController(dependencies);

router.post(
  '/category/createcategory',
  categoryController.createCategory,
);
router.get(
  '/category/:_id',
  categoryController.getCategory,
);
router.get(
  '/category/',
  categoryController.getAllCategory,
);
router.put(
  '/category/:_id',
  categoryController.updateCategory,
);
router.delete(
  '/category/:_id',
  categoryController.deleteCategory,
);
router.post(
  '/category/createsubcategory/',
  categoryController.createSubCategory,
);
router.get(
  '/category/getsubcategory/:_id',
  categoryController.getSubCategory,
);
router.get(
  '/subcategory/',
  categoryController.getAllSubCategory,
);
router.put(
  '/updatesubcategory/:_id',
  categoryController.updateSubCategory,
);

router.delete(
  '/deletesubcategory/:_id',
  categoryController.deleteSubCategory,
);
module.exports = router;
