const { Router } = require('express');
const authController = require('../controllers/authController.js');
const { checkUser } = require('../middleware/authMiddleware.js');

const router = Router();

router.route('/login')
    .post(authController.login)

router.route('/profile')
    .get(authController.getProfile)

router.route('/logout')
    .get(authController.logout)

router.route('/reset-password')
    .post(authController.resetPassword)

router.route('/reset-password/:token')
    .get(authController.resetPasswordToken)

router.route('/update-password')
    .patch(authController.updatePassword)

module.exports = router;