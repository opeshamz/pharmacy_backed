const { Router } = require('express');
const commonRoutes = require('./common');
const userRoutes = require('./user');

const router = new Router();
router.use('/', commonRoutes);
router.use('/', userRoutes);
module.exports = router;
