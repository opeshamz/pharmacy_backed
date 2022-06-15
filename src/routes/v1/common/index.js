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
const productController = new ProductController(dependencies);
const prescriptionController = new PrescriptionController(dependencies);
const cartController = new CartController(dependencies);
const orderController = new OrderController(dependencies);

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
router.post(
  '/product/createProduct',
  productController.createProduct,
);
router.get(
  '/product/:_id',
  productController.getProduct,
);
router.get(
  '/product/',
  productController.getAllProduct,
);
router.put(
  '/updateproduct/:_id',
  productController.updateProduct,
);
router.delete(
  '/deleteproduct/:_id',
  productController.deleteProduct,
);
router.post(
  '/prescription/createprescription',
  prescriptionController.createPrescription,
);
router.get(
  '/prescription/:_id',
  prescriptionController.getPrescription,
);
router.get(
  '/prescription/',
  prescriptionController.getAllPrescription,
);
router.put(
  '/updateprescription/:_id',
  prescriptionController.updatePrescription,
);
router.delete(
  '/deleteprescription/:_id',
  prescriptionController.deletePrescription,
);
router.post(
  '/cart/createcart',
  cartController.createCart,
);
router.get(
  '/cart/:_id',
  cartController.getCart,
);
router.get(
  '/cart/',
  cartController.getAllCart,
);
router.post(
  '/addtocart/:_id',
  cartController.addToCart,
);
router.delete(
  '/removecart/:_id',
  cartController.removeCartItem,
);
router.get(
  '/cart/total/:_id',
  cartController.getCartTotal,
);
router.delete(
  '/deletecart/:_id',
  cartController.deleteCart,
);
router.post(
  '/order/createorder',
  orderController.createOrder,
);
router.get(
  '/order/:_id',
  orderController.getOrder,
);
router.get(
  '/order/',
  orderController.getAllOrder,
);
router.post(
  '/orderstatus/:_id',
  orderController.orderStatus,
);
module.exports = router;
