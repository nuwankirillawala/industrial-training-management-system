const { Router } = require('express')
const alumniController = require('../controllers/alumniController');

const router = Router();

router.route('/create')
    .post(alumniController.createAlumni)

router.route('/dashboard')
    .get(alumniController.getAlumniDashboard)

router.route('/profile')
    .get(alumniController.getAlumniProfile)
    .patch(alumniController.updateAlumniProfile)

router.route('/user/:userId')
    .get(alumniController.getAlumniUser)
    .patch(alumniController.updateAlumniUser)

router.route('/user/all')
    .get(alumniController.getAllAlumniUsers)

module.exports = router;