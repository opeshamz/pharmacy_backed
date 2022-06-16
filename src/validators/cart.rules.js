const joi = require('joi');

const requiredString = joi.string().required();
const requiredNumber = joi.number().required();

const keys = (object) => joi.object().keys(object);

exports.createCart = keys({
  user_id: requiredString,
  name: requiredString.max(50).description('cart name'),
  product_id: requiredString,
  quantity: requiredNumber,
  price: requiredNumber,
  image: requiredString,
});

exports.addToCart = keys({
  name: requiredString.max(50).description('cart name'),
  product_id: requiredString,
  quantity: requiredNumber,
  price: requiredNumber,
  image: requiredString,
});
