// const Joi = require('joi');

// module.exports = (req, res, next) => {
//   req.body.idMeta = { type: 'email', value: req.body.identifier };

//   const { _, error } = Joi.string().email().validate(req.body.identifier);
//   if (error) {
//     req.body.idMeta.type = 'phone_number';
//   }
//   return next();
// };
