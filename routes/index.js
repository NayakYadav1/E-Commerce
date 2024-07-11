const { Router } = require('express');
const authRoutes = require('./auth.routes');
const profileRoutes = require('./profile.routes');
const cmsRoutes = require('./cms');
const { auth, cmsAccess } = require('@/lib');
const customersRoutes = require('@/routes/cms/customers.routes');

const router = Router();

router.use('/auth', authRoutes);

router.use('/profile', auth, profileRoutes);

router.use('/cms', auth, cmsAccess, cmsRoutes);

router.use('/customers', customersRoutes);

router.use((req, res, next) => {
    next({
        message : 'Resource Not Found',
        status: 404
    });
});

module.exports = router;