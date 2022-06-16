const joi = require('joi');

const requiredString = joi.string().required();
// const requiredNumber = joi.number().required();

const keys = (object) => joi.object().keys(object);

exports.createProduct = keys({
  name: requiredString.max(50).description('product name'),
  category_id: requiredString,
  sub_category_id: requiredString,
  brand: requiredString.max(50).description('brand name'),
});

exports.updateProduct = keys({
  name: requiredString.max(50).description('product name'),
  category_id: requiredString,
  sub_category_id: requiredString,
  brand: requiredString.max(50).description('brand name'),
});
