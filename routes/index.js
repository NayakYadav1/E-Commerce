const { Router } = require('express');
const authRoutes = require('./auth.routes');
const profileRoutes = require('./profile.routes');
const cmsRoutes = require('./cms');
const { auth, cmsAccess } = require('@/lib');
const frontRoutes = require('@/routes/front');

const router = Router();

router.use('/auth', authRoutes);

router.use('/profile', auth, profileRoutes);

router.use('/cms', auth, cmsAccess, cmsRoutes);

router.use(frontRoutes);

router.use((req, res, next) => {
    next({
        message : 'Resource Not Found',
        status: 404
    });
});

module.exports = router;