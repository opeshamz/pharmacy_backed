const Product = require('../models/product.model');
const { successResponse } = require('../utils/responses');
const { randomStringGen } = require('../utils/helpers');

class ProductController {
  constructor(dependencies = {}) {
    this.dependencies = dependencies;
    this.e = this.dependencies.errors;
    this.createProduct = this.createProduct.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.getAllProduct = this.getAllProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  async createProduct(req, res) {
    const { name } = req.body;
    const product = await Product.findOne({ name }).lean();
    if (product) {
      throw new this.e.BadRequestError('Product already exist, please change the name');
    }
    const SKU = randomStringGen(10).toUpperCase();
    const newProduct = await Product.create({
      name: req.body.name,
      category_id: req.body.category_id,
      sub_category_id: req.body.sub_category_id,
      brand: req.body.brand,
      SKU,
    });
    return successResponse(res, 200, newProduct, 'Product created successfully');
  }

  async getProduct(req, res) {
    const { _id } = req.params;
    const product = await Product.findById({ _id }).lean();
    if (!product) {
      throw new this.e.BadRequestError('Product does not exist, please create a new product');
    }
    return successResponse(res, 200, product, ' Product retrieved successfully');
  }

  // eslint-disable-next-line class-methods-use-this
  async getAllProduct(req, res) {
    const products = await Product.find({}).lean();
    if (!products) {
      return successResponse(res, 200, {}, ' No product found');
    }
    return successResponse(res, 200, products, 'All products retrieved successfully');
  }

  async updateProduct(req, res) {
    const { _id } = req.params;
    const product = await Product.findById({ _id }).lean();
    if (!product) {
      throw new this.e.BadRequestError('Product does not exist, please create a new product');
    }
    const { name } = req.body;
    const productExist = await Product.findOne({ name }).lean();
    if (productExist) {
      throw new this.e.BadRequestError('Product already exist, please change the name');
    }
    const updateProduct = await Product.findByIdAndUpdate({ _id }, {
      name: req.body.name,
      category_id: req.body.category_id,
      sub_category_id: req.body.sub_category_id,
      brand: req.body.brand,
    });
    return successResponse(res, 200, updateProduct, 'Product updated successfully');
  }

  async deleteProduct(req, res) {
    const { _id } = req.params;
    const product = await Product.findById({ _id }).lean();
    if (!product) {
      throw new this.e.BadRequestError('Product does not exist');
    }
    const deleteProduct = await Product.findByIdAndDelete({ _id }).lean();
    return successResponse(res, 200, deleteProduct, 'Product deleted successfully');
  }
}
module.exports = ProductController;
