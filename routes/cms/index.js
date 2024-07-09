const { Router } = require('express');
const staffsRoutes = require('./staffs.routes');
const { adminOnly } = require('@/lib');

const router = Router()

router.use('/staffs', adminOnly, staffsRoutes)

module.exports = router;