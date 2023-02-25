const { Router } = require('express');
const undergraduateController = require('../controllers/undergraduateController');

const router = Router();

router.route('/view-undergraduate-profile')
    .get(undergraduateController.viewUndergraduateProfile)
// router.route('/update-profile')
//     .patch(undergraduateController.updateProfile)

module.exports = router;