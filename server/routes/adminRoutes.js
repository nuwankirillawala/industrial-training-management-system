const { Router } = require('express');
const adminController = require('../controllers/adminController');
const { imageUpload } = require('../middleware/uploadMiddleware');

const router = Router();

router.route('/create')
    .post(adminController.createAdmin)

router.route('/profile')
    .get(adminController.adminProfile)
    .patch(adminController.updateAdminProfile)

router.route('/profile/image')
    .patch(imageUpload, adminController.updateAdminProfileImage)

router.route('/users/:userType')
    .get(adminController.viewAllUsers)

router.route('/users/search/:userType')
    .get(adminController.searchUsers)


module.exports = router;