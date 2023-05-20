const { Router } = require('express');
const adminController = require('../controllers/adminController');
const { imageUpload } = require('../middleware/uploadMiddleware');

const router = Router();

router.route('/create-admin')
    .post(adminController.createAdmin)

router.route('/view-all-users/:userType')
    .get(adminController.viewAllUsers)

router.route('/search-users/:userType')
    .get(adminController.searchUsers)

router.route('/admin-profile')
    .get(adminController.adminProfile)

router.route('/update-admin')
    .patch(adminController.updateAdminProfile)

router.route('/update-admin-profile-image')
    .patch(imageUpload, adminController.updateAdminProfileImage)

module.exports = router;