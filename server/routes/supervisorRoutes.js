const { Router } = require('express');
const supervisorController = require('../controllers/supervisorController');
const { restrictedTo } = require('../middleware/authMiddleware');
const { imageUpload } = require('../middleware/uploadMiddleware');
const { deleteExistingImage } = require('../middleware/deleteMiddleware');

const router = Router();

router.route('/create')
    .post(restrictedTo('system-admin', 'department-coordinator'), supervisorController.createSupervisor)

router.route('/profile')
    .patch(restrictedTo('supervisor'), supervisorController.updateSupervisor)
    .get(restrictedTo('supervisor'), supervisorController.getSupervisor)

router.route('/profile/image')
    .patch(restrictedTo('supervisor'), deleteExistingImage, imageUpload, supervisorController.updateProfileImage)

router.route('/users')
    .get(restrictedTo('system-admin', 'department-coordinator'), supervisorController.getAllSupervisors)

router.route('/:userId')
    .get(restrictedTo('system-admin', 'department-coordinator'), supervisorController.viewSupervisor)
    .patch(restrictedTo('system-admin', 'department-coordinator'), supervisorController.updateSupervisorUser)

router.route('/delete/:userId')
    .delete(restrictedTo('system-admin', 'department-coordinator'), supervisorController.deleteSupervisor)


module.exports = router;