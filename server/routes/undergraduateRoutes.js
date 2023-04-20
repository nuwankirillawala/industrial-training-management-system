const { Router } = require('express');
const undergraduateController = require('../controllers/undergraduateController');
const {checkUser} = require('../middleware/authMiddleware');

const router = Router();

router.route('/create-undergraduate')
    .post(undergraduateController.createUndergraduate)

router.route('/view-undergraduate-profile')
    .get(undergraduateController.viewUndergraduateProfile)

router.route('/update-undergraduate-profile')
    .patch(undergraduateController.updateUndergraduateProfile)

router.route('/view-intern-list')
    .get(undergraduateController.viewInternList)

router.route('/company-selection')
    .patch(undergraduateController.companySelection)

router.route('/undergraduate-dashboard')
    .get(checkUser, undergraduateController.undergraduateDashboard)

router.route('/add-note')
    .patch(undergraduateController.addNote)

router.route('/view-notes')
    .get(undergraduateController.viewNotes)

router.route('/view-note')
    .get(undergraduateController.viewNote)

router.route('/edit-note')
    .patch(undergraduateController.editNote)

router.route('/add-result')
    .post(undergraduateController.addResult)

router.route('/set-weighted-gpa')
    .post(undergraduateController.setWeightedGPA)

// 🛑 This is a tempory route controller. just for checking 🛑
router.route('/add-intern-status')
    .patch(undergraduateController.addInternStatus)

router.route('/edit-intern-status')
    .patch(undergraduateController.editInternStatus)

router.route('/company-selection')
    .patch(undergraduateController.companySelection)

router.route('/assign-supervisor')
    .get(undergraduateController.assignSupervisorGET)
    .patch(undergraduateController.assignSupervisorPATCH)

router.route('/update-internship-period')
    .patch(undergraduateController.updateInternshipPeriod)


module.exports = router;