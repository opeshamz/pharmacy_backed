const { Router } = require('express');
const { logger, ...env } = require('../../../../config');
const errors = require('../../../utils/errors');

// const auth = require('../../../middlewares/authenticator');
// const checkValidID = require('../../../middlewares/checkValidID');
// const checkIDType = require('../../../middlewares/checkIdentifierType');
// const checkSlugOrID = require('../../../middlewares/checkSlugOrID');

// eslint-disable-next-line import/no-unresolved
const CategoryController = require('../../../controllers/Category.controller');
const ProductController = require('../../../controllers/Product.controller');
const PrescriptionController = require('../../../controllers/Prescription.controller');
const CartController = require('../../../controllers/Cart.controller');
const OrderController = require('../../../controllers/Order.controller');
// const SubCategoryController = require('../../../controllers/Sub_category.controller');
// const AuthController = require('../../../controllers/Auth.controller');

const rules = require('../../../validators');
const {
  verifyAllUserToken,
  verifySuperAdmin,
  optionalTokenCheck,
//   VerifyStoreAdmin, // eslint-disable-next-line no-unused-vars
//  checkIsSuper,
} = require('../../../middlewares/authenticator');
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
const productController = new ProductController(dependencies);
const prescriptionController = new PrescriptionController(dependencies);
const cartController = new CartController(dependencies);
const orderController = new OrderController(dependencies);

// const authController = new AuthController(dependencies);

router.post(
  '/category/createcategory',
  [optionalTokenCheck, verifyAllUserToken, verifySuperAdmin],
  rules('createCategory'),
  categoryController.createCategory,
);
router.get(
  '/category/:_id',
  [optionalTokenCheck, verifyAllUserToken, verifySuperAdmin],
  categoryController.getCategory,
);
router.get(
  '/category/',
  [optionalTokenCheck, verifyAllUserToken, verifySuperAdmin],
  categoryController.getAllCategory,
);
router.put(
  '/category/:_id',
  [optionalTokenCheck, verifyAllUserToken, verifySuperAdmin],
  rules('updateCategory'),
  categoryController.updateCategory,
);
router.delete(
  '/category/:_id',
  [optionalTokenCheck, verifyAllUserToken, verifySuperAdmin],
  categoryController.deleteCategory,
);
router.post(
  '/category/createsubcategory/',
  [optionalTokenCheck, verifyAllUserToken, verifySuperAdmin],
  rules('createSubCategory'),
  categoryController.createSubCategory,
);
router.get(
  '/category/getsubcategory/:_id',
  [optionalTokenCheck, verifyAllUserToken, verifySuperAdmin],
  categoryController.getSubCategory,
);
router.get(
  '/subcategory/',
  [optionalTokenCheck, verifyAllUserToken, verifySuperAdmin],
  categoryController.getAllSubCategory,
);
router.put(
  '/updatesubcategory/:_id',
  [optionalTokenCheck, verifyAllUserToken, verifySuperAdmin],
  rules('updateSubCategory'),
  categoryController.updateSubCategory,
);
router.delete(
  '/deletesubcategory/:_id',
  [optionalTokenCheck, verifyAllUserToken, verifySuperAdmin],
  categoryController.deleteSubCategory,
);
router.post(
  '/product/createProduct',
  [optionalTokenCheck, verifyAllUserToken, verifySuperAdmin],
  rules('createProduct'),
  productController.createProduct,
);
router.get(
  '/product/:_id',
  [optionalTokenCheck, verifyAllUserToken, verifySuperAdmin],
  productController.getProduct,
);
router.get(
  '/product/',
  [optionalTokenCheck, verifyAllUserToken, verifySuperAdmin],
  productController.getAllProduct,
);
router.put(
  '/updateproduct/:_id',
  [optionalTokenCheck, verifyAllUserToken, verifySuperAdmin],
  rules('updateProduct'),
  productController.updateProduct,
);
router.delete(
  '/deleteproduct/:_id',
  [optionalTokenCheck, verifyAllUserToken, verifySuperAdmin],
  productController.deleteProduct,
);
router.post(
  '/prescription/createprescription',
  [optionalTokenCheck, verifyAllUserToken],
  rules('createPrescription'),
  prescriptionController.createPrescription,
);
router.get(
  '/prescription/:_id',
  [optionalTokenCheck, verifyAllUserToken, verifySuperAdmin],
  prescriptionController.getPrescription,
);
router.get(
  '/prescription/',
  [optionalTokenCheck, verifyAllUserToken, verifySuperAdmin],
  prescriptionController.getAllPrescription,
);
router.put(
  '/updateprescription/:_id',
  [optionalTokenCheck, verifyAllUserToken],
  rules('updatePrescription'),
  prescriptionController.updatePrescription,
);
router.delete(
  '/deleteprescription/:_id',
  [optionalTokenCheck, verifyAllUserToken, verifySuperAdmin],
  prescriptionController.deletePrescription,
);
router.post(
  '/cart/createcart',
  [optionalTokenCheck, verifyAllUserToken],
  rules('createCart'),
  cartController.createCart,
);
router.post(
  '/addtocart/:_id',
  [optionalTokenCheck, verifyAllUserToken],
  rules('addToCart'),
  cartController.addToCart,
);
router.delete(
  '/removecart/:_id',
  [optionalTokenCheck, verifyAllUserToken],
  cartController.removeCartItem,
);
router.get(
  '/cart/:_id',
  [optionalTokenCheck, verifyAllUserToken, verifySuperAdmin],
  cartController.getCart,
);
router.get(
  '/cart/',
  [optionalTokenCheck, verifyAllUserToken, verifySuperAdmin],
  cartController.getAllCart,
);
router.get(
  '/cart/total/:_id',
  [optionalTokenCheck, verifyAllUserToken],
  cartController.getCartTotal,
);
router.delete(
  '/deletecart/:_id',
  [optionalTokenCheck, verifyAllUserToken, verifySuperAdmin],
  cartController.deleteCart,
);
router.post(
  '/order/createorder',
  [optionalTokenCheck, verifyAllUserToken],
  rules('createOrder'),
  orderController.createOrder,
);
router.get(
  '/order/:_id',
  [optionalTokenCheck, verifyAllUserToken],
  orderController.getOrder,
);
router.get(
  '/order/',
  [optionalTokenCheck, verifyAllUserToken, verifySuperAdmin],
  orderController.getAllOrder,
);
router.post(
  '/orderstatus/:_id',
  [optionalTokenCheck, verifyAllUserToken],
  orderController.orderStatus,
);
module.exports = router;
