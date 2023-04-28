const { Router} = require('express')
const alumniController = require('../controllers/alumniController');

const router = Router();

router.route('/create-alumni')
    .post(alumniController.createAlumni)

module.exports = router;