const { Router } = require('express');
const staffsRoutes = require('./staffs.routes');
const { adminOnly } = require('@/lib');
const customersRoutes = require('./customers.routes');

const router = Router();

router.use('/staffs', adminOnly, staffsRoutes);

router.use('/customers', customersRoutes);

module.exports = router;