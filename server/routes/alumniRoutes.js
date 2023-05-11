const { Router} = require('express')
const alumniController = require('../controllers/alumniController');

const router = Router();

router.route('/create-alumni')
    .post(alumniController.createAlumni)

router.route('/update-alumni-profile')
    .patch(alumniController.updateAlumniProfile)

module.exports = router;