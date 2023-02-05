const {Router} = require('express');
const authController = require('../controllers/authController.js');
const Undergraduate = require('../models/Undergraduate.js');

const router = Router();

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
router.get('/create-user/:userType', authController.create_user_get);
router.post('/create-user/:userType', authController.create_user_post);

router.get('/create-admin', authController.create_admin_get);
router.post('/create-admin', authController.create_admin_post);
// router.get('/create-undergraduate', authController.create_undergraduate_get);
// router.post('/create-undergraduate', authController.create_undergraduate_post);
// router.get

module.exports = router;