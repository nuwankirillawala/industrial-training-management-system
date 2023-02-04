const {Router} = require('express');
const authController = require('../controllers/authController.js');

const router = Router();

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
router.get('/create-admin', authController.create_admin_get);
router.post('/create-admin', authController.create_admin_post);

module.exports = router;