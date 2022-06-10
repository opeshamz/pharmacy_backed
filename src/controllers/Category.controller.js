/* eslint-disable class-methods-use-this */
const Category = require('../models/category.model');
const { successResponse } = require('../utils/responses');
const SubCategory = require('../models/sub_category');
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
    this.createSubCategory = this.createSubCategory.bind(this);
    this.getSubCategory = this.getSubCategory.bind(this);
    this.getAllSubCategory = this.getAllSubCategory.bind(this);
    this.updateSubCategory = this.updateSubCategory.bind(this);
    this.deleteSubCategory = this.deleteSubCategory.bind(this);
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
    const categories = await Category.find({}).lean();
    if (!categories) {
      return successResponse(res, 200, {}, ' No category found');
    }
    return successResponse(res, 200, categories, 'All categories retrieved successfully');
  }

  async updateCategory(req, res) {
    const { _id } = req.params;
    const category = await Category.findById({ _id }).lean();
    if (!category) {
      throw new this.e.BadRequestError('Category does not exist, please create a new category');
    }
    const { name } = req.body;
    const categoryExist = await Category.findOne({ name }).lean();
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
    const category = await Category.findById({ _id }).lean();
    if (!category) {
      throw new this.e.BadRequestError('Category does not exist');
    }
    const deletedCategory = await Category.findByIdAndDelete({ _id }).lean();
    return successResponse(res, 200, deletedCategory, 'Category deleted successfully');
  }

  async createSubCategory(req, res) {
    const { name } = req.body;
    const subCategoryExist = await SubCategory.findOne({ name });
    if (subCategoryExist) {
      throw new this.e.BadRequestError('Sub Category already exist, please change the name');
    }
    const subCategory = await SubCategory.create({
      name: req.body.name,
      icon: req.body.icon,
      priority: req.body.priority,
      category: req.body.category,
    });
    return successResponse(res, 200, subCategory, 'Sub Category created successfully');
  }

  async getSubCategory(req, res) {
    const { _id } = req.params;
    const subCategory = await SubCategory.findById({ _id }).lean();
    if (!subCategory) {
      throw new this.e.BadRequestError('Sub Category does not exist, please create a new sub category');
    }
    return successResponse(res, 200, subCategory, 'Sub category retrieved successfully');
  }

  async getAllSubCategory(req, res) {
    const subCategories = await SubCategory.find({}).lean();
    if (!subCategories) {
      return successResponse(res, 200, {}, ' No sub category found');
    }
    return successResponse(res, 200, subCategories, 'All sub categories retrieved successfully');
  }

  async updateSubCategory(req, res) {
    const { _id } = req.params;
    const subCategory = await SubCategory.findById({ _id }).lean();
    if (!subCategory) {
      throw new this.e.BadRequestError('Sub Category does not exist, please create a new sub category');
    }
    const { name } = req.body;
    const subCategoryExist = await SubCategory.findOne({ name }).lean();
    if (subCategoryExist) {
      throw new this.e.BadRequestError('Sub Category already exist, please change the name');
    }
    const updateSubCategory = await SubCategory.findByIdAndUpdate({ _id }, {
      name: req.body.name,
      icon: req.body.icon,
      priority: req.body.priority,
    });
    return successResponse(res, 200, updateSubCategory, 'Sub Category updated successfully');
  }

  async deleteSubCategory(req, res) {
    const { _id } = req.params;
    const subCategory = await SubCategory.findById({ _id }).lean();
    if (!subCategory) {
      throw new this.e.BadRequestError('Sub Category does not exist');
    }
    const deleteSubCategory = await SubCategory.findByIdAndDelete({ _id }).lean();
    return successResponse(res, 200, deleteSubCategory, 'Sub Category deleted successfully');
  }
}
module.exports = CategoryController;
