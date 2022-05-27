// /* eslint-disable no-unused-vars */
// /**
// * Checks if user has permission,
// * True ? allow user access to route : return forbidden
// */
// const AccessControl = require('accesscontrol');
// // const accessControlMiddleware = new AccessControlMiddleware(ac);
// const { errorResponse } = require('../utils/responses');

// const unauthorizedResponse = (
//   res,
//   err,
//   message = 'You do not have enough permission to access this resource',
// ) => errorResponse(res, 403, err, message);

// // eslint-disable-next-line consistent-return
// const CheckPermission = (action, resource) => async (req, res, next) => {
//   const roles = await Role.find().populate('permissions').lean();
//   const generated_grants = [];
//   await roles.forEach((role) => {
//     role.permissions.forEach((permission) => {
//       generated_grants.push(
//         {
//           role: role.slug,
//           resource: permission.resource,
//           action: permission.action,
//           attributes: permission.attributes,
//         },
//       );
//     });
//   });
//   const ac = new AccessControl(generated_grants);
//   // const access = ac.can(req.user ? req.user.role : 'guests')[action](resource);
//   // if (!access.granted) {
//   //   return unauthorizedResponse(res, { err: 'UNAUTHORIZED' });
//   // }
//   return next();
// };

// module.exports = CheckPermission;
