const { Router } = require('express');
const authController = require('../controllers/authController.js');

const router = Router();

router.route('/login')
    .get(authController.login_get)
    .post(authController.login_post)

router.route('/logout')
    .get(authController.logout_get);


module.exports = router;