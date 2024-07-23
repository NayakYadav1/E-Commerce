const { Router } = require('express');
const { Auth } = require('@/controllers');
const { customerOnly } = require('@/lib');

const router = Router();

router.get('/detail', Auth.ProfileCtrl.detail);

// router.put('/update', Auth.ProfileCtrl.update);
// router.patch('/update', Auth.ProfileCtrl.update);

router.route('/update')
    .put(Auth.ProfileCtrl.update)
    .patch(Auth.ProfileCtrl.update);

router.route('/password')
    .put(Auth.ProfileCtrl.password)
    .patch(Auth.ProfileCtrl.password);

router.get('/reviews', customerOnly, Auth.ProfileCtrl.reviews);
router.get('/orders', customerOnly, Auth.ProfileCtrl.orders);

module.exports = router;