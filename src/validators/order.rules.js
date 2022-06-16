const joi = require('joi');

const requiredString = joi.string().required();
const requiredNumber = joi.number().required();

const keys = (object) => joi.object().keys(object);

exports.createOrder = keys({
  user_id: requiredString,
  ordered_item: requiredString,
  price: requiredNumber,
  brand: requiredString.max(50).description('brand name'),
  quantity: requiredNumber,
  product_id: requiredString,
  image: requiredString,
  name: requiredString.max(50).description('user name'),
  order_date: requiredString,
  delivery_fee: requiredNumber,
  cart_total: requiredNumber,
  address: requiredString,
  payment_mode: requiredString,
  phone_number: requiredNumber,
  payment_details: requiredString,
  order_status: requiredString,

});
