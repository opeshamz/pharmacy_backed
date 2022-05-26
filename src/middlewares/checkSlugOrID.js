// const Joi = require('joi');
// /**
// * Checks if the identifier passed is an id or a slug

// */
// module.exports = (req, res, next) => {
//   const key = Object.keys(req.params).find((x) => x.endsWith('_id'));
//   req.body.idMeta = { type: '_id', value: req.params[key] };
//   // eslint-disable-next-line no-unused-vars
//   const { _, error } = Joi.string().regex(/^[a-fA-F0-9]{24}$/).validate(req.params[key]);
//   if (error) {
//     req.body.idMeta.type = 'slug';
//   }
//   return next();
// };
