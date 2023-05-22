const { Router} = require('express')
const alumniController = require('../controllers/alumniController');

const router = Router();

router.route('/create')
    .post(alumniController.createAlumni)

router.route('/profile')
    .patch(alumniController.updateAlumniProfile)

module.exports = router;