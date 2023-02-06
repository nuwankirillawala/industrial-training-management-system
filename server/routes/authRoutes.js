const { Router } = require('express');
const authController = require('../controllers/authController.js');

const router = Router();

router.route('/login')
    .get(authController.login_get)
    .post(authController.login_post)

router.route('/logout')
    .get(authController.logout_get);

router.route('/reset-password')
    .post(authController.resetPassword_post)

router.route('/reset-password/:token')
    .get(authController.resetPasswordToken_get)

router.route('/update-password')
    .patch(authController.updatePassword_patch)

module.exports = router;