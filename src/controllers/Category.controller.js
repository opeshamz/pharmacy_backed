const Category = require('../models/category.model');
const { successResponse } = require('../utils/responses');
// const { generateCode } = require('../utils/helpers');

class CategoryController {
  constructor(dependencies = {}) {
    this.dependencies = dependencies;
    this.e = this.dependencies.errors;
    this.createCategory = this.createCategory.bind(this);
    this.getCategory = this.getCategory.bind(this);
    this.getAllCategory = this.getAllCategory.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  async createCategory(req, res) {
    const { name } = req.body;
    const categoryExist = await Category.findOne({ name });
    if (categoryExist) {
      throw new this.e.BadRequestError('Category already exist, please change the name');
    }
    const category = await Category.create({
      name: req.body.name,
      icon: req.body.icon,
      priority: req.body.priority,
    });
    return successResponse(res, 200, category, 'Category created successfully');
  }

  // eslint-disable-next-line consistent-return
  async getCategory(req, res) {
    const { _id } = req.params;
    const category = await Category.findById({ _id }).lean();
    if (!category) {
      throw new this.e.BadRequestError('Category does not exist, please create a new category');
    }
    return successResponse(res, 200, category, ' Category retrieved successfully');
  }

  // eslint-disable-next-line class-methods-use-this
  async getAllCategory(req, res) {
    const categories = await Category.find({});
    if (!categories) {
      return successResponse(res, 200, {}, ' No category found');
    }
    return successResponse(res, 200, categories, 'All categories retrieved successfully');
  }

  async updateCategory(req, res) {
    const { _id } = req.params;
    const category = await Category.findById({ _id });
    if (!category) {
      throw new this.e.BadRequestError('Category does not exist, please create a new category');
    }
    const { name } = req.body;
    const categoryExist = await Category.findOne({ name });
    if (categoryExist) {
      throw new this.e.BadRequestError('Category already exist, please change the name');
    }
    const updatedCategory = await Category.findByIdAndUpdate({ _id }, {
      name: req.body.name,
      icon: req.body.icon,
      priority: req.body.priority,
    });
    return successResponse(res, 200, updatedCategory, 'Category updated successfully');
  }

  async deleteCategory(req, res) {
    const { _id } = req.params;
    const category = await Category.findById({ _id });
    if (!category) {
      throw new this.e.BadRequestError('Category does not exist, please create a new category');
    }
    const deletedCategory = await Category.findByIdAndDelete({ _id });
    return successResponse(res, 200, deletedCategory, 'Category deleted successfully');
  }
}
module.exports = CategoryController;
