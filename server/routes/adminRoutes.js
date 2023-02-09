const { Router } = require('express');
const adminController = require('../controllers/adminController');

const router = Router();

router.route('/create-user/:userType')
    .get(adminController.createUser_get)
    .post(adminController.createUser_post)

router.route('/view-all-users/:userType')
    .get(adminController.viewAllUsers_get)
    

module.exports = router;