const { Router } = require('express');
const staffsRoutes = require('./staffs.routes');
const { adminOnly } = require('@/lib');
const customersRoutes = require('./customers.routes');
const brandRoutes = require('./brand.routes');

const router = Router();

router.use('/staffs', adminOnly, staffsRoutes);

router.use('/customers', customersRoutes);
router.use('/brands', brandRoutes);

module.exports = router;