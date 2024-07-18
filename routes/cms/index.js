const { Router } = require('express');
const staffsRoutes = require('./staffs.routes');
const customersRoutes = require('./customers.routes');
const brandRoutes = require('./brand.routes');
const categoryRoutes = require('./category.routes');
const productsRoutes = require('./products.routes');
const reviewsRoutes = require('./reviews.routes');
const ordersRoutes = require('./orders.routes');
const { adminOnly } = require('@/lib');

const router = Router();

router.use('/staffs', adminOnly, staffsRoutes);
router.use('/customers', customersRoutes);
router.use('/brands', brandRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productsRoutes);
router.use('/reviews', reviewsRoutes);
router.use('/orders', ordersRoutes);

module.exports = router;