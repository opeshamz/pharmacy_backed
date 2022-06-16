const joi = require('joi');

const requiredString = joi.string().required();
const requiredNumber = joi.number().required();
const keys = (object) => joi.object().keys(object);

exports.createPrescription = keys({
  name: requiredString.max(50).description('prescription name'),
  user_id: requiredString,
  prescription_image: requiredString,
  brand: requiredString.max(50).description('prescription image'),
  quantity: requiredNumber,
});

exports.updatePrescription = keys({
  name: requiredString.max(50).description('prescription name'),
  prescription_image: requiredString,
  brand: requiredString.max(50).description('prescription image'),
  quantity: requiredNumber,
});
