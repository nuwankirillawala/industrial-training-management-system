const { Router } = require('express');
const adminController = require('../controllers/adminController');

const router = Router();

router.route('/create-user/:userType')
    .get(adminController.createUser_get)
    .post(adminController.createUser_post)

module.exports = router;