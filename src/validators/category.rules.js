const joi = require('joi');

const requiredString = joi.string().required();
const requiredNumber = joi.number().required();

const keys = (object) => joi.object().keys(object);

exports.createCategory = keys({
  name: requiredString.max(50).description('Category name'),
  icon: requiredString.max(50).description('Category icon'),
  priority: requiredNumber,
});

exports.updateCategory = keys({
  name: requiredString.max(50).description('Category name'),
  icon: requiredString.max(50).description('Category icon'),
  priority: requiredNumber,
});
