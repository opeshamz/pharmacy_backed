const joi = require('joi');

const requiredString = joi.string().required();
const requiredNumber = joi.number().required();

const keys = (object) => joi.object().keys(object);

exports.createSubCategory = keys({
  name: requiredString.max(50).description('Sub Category name'),
  icon: requiredString.max(50).description('Sub Category icon'),
  priority: requiredNumber,
  category_id: requiredString,
});

exports.updateSubCategory = keys({
  name: requiredString.max(50).description('Sub Category name'),
  icon: requiredString.max(50).description('Sub Category icon'),
  priority: requiredNumber,
});
