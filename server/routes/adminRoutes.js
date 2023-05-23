const { Router } = require('express');
const adminController = require('../controllers/adminController');
const { imageUpload } = require('../middleware/uploadMiddleware');
const { deleteExistingImage } = require('../middleware/deleteMiddleware');

const router = Router();

router.route('/create')
    .post(adminController.createAdmin)

router.route('/profile')
    .get(adminController.getAdminProfile)
    .patch(adminController.updateAdminProfile)

router.route('/user/:userId')
    .get(adminController.getAdminUser)
    .patch(adminController.updateAdminUser)

router.route('/profile/image')
    .patch(deleteExistingImage, imageUpload, adminController.updateAdminProfileImage)

router.route('/users/:userType')
    .get(adminController.viewAllUsers)

router.route('/users/search/:userType')
    .get(adminController.searchUsers)


module.exports = router;