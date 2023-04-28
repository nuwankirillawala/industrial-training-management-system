const { Router } = require('express');
const adminController = require('../controllers/adminController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

// router.route('/create-user/:userType')
//     .post(requireAuth, adminController.createUser)

router.route('/create-admin')
    .post(adminController.createAdmin)

router.route('/view-all-users/:userType')
    .get(adminController.viewAllUsers)

router.route('/search-users/:userType')
    .get(adminController.searchUsers)

router.route('/admin-profile')
    .get(adminController.adminProfile)

router.route('/update-admin-profile')
    .patch(adminController.updateAdminProfile)

// router.route('update-result-schema')

module.exports = router;