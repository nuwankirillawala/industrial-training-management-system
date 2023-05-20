const { Router } = require('express');
const supervisorController = require('../controllers/supervisorController');
const { restrictedTo } = require('../middleware/authMiddleware');

const router = Router();

router.route('/create')
    .post(restrictedTo('system-admin', 'department-coordinator'), supervisorController.createSupervisor)

router.route('/profile')
    .patch(restrictedTo('supervisor'), supervisorController.updateSupervisor)
    .get(restrictedTo('supervisor'), supervisorController.getSupervisor)

router.route('/users')
    .get(restrictedTo('system-admin', 'department-coordinator'), supervisorController.getAllSupervisors)

router.route('/:userId')
    .get(restrictedTo('system-admin', 'department-coordinator'), supervisorController.viewSupervisor)

module.exports = router;