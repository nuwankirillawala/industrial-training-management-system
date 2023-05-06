const { Router } = require('express');
const undergraduateController = require('../controllers/undergraduateController');
const { checkUser } = require('../middleware/authMiddleware');
const { cvUpload, imageUpload } = require('../middleware/uploadMiddleware');

const router = Router();

router.route('/create-undergraduate')
    .post(undergraduateController.createUndergraduate)

router.route('/get-undergraduate/:undergraduateId')
    .get(undergraduateController.getUndergraduate)

router.route('/view-undergraduate-profile')
    .get(undergraduateController.viewUndergraduateProfile)

router.route('/update-undergraduate-profile')
    .patch(imageUpload, undergraduateController.updateUndergraduateProfile)

router.route('/view-all-undergraduates')
    .get(undergraduateController.viewAllUndergraduates)

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

router.route('/update-intern-status')
    .patch(undergraduateController.updateInternStatus)

router.route('/company-selection')
    .patch(undergraduateController.companySelection)

router.route('/assign-supervisor')
    .get(undergraduateController.assignSupervisorGET)
    .patch(undergraduateController.assignSupervisorPATCH)

router.route('/update-internship')
    .patch(undergraduateController.updateInternship)

router.route('/view-all-daily-reports')
    .get(undergraduateController.viewAllDailyReports)

router.route('/view-daily-report')
    .get(undergraduateController.viewDailyReport);

router.route('/edit-daily-report')
    .post(undergraduateController.editDailyReport)

router.route('/edit-weekly-report-problem-section')
    .post(undergraduateController.editDailyProblemSection)

router.route('/upload-cv')
    .post(cvUpload, undergraduateController.uploadCV)

router.route('/soft-skill')
    .post(undergraduateController.addSoftSkill)
    .delete(undergraduateController.deleteSoftSkill)

router.route('/technology-skill')
    .post(undergraduateController.addTechnologySkill)
    .delete(undergraduateController.deleteTechnologySkill)

router.route('/certifications')
    .post(undergraduateController.addCertifications)
    .delete(undergraduateController.deleteCertifications)

router.route('/extra-activities')
    .post(undergraduateController.addExtraActivities)
    .delete(undergraduateController.deleteExtraActivities)

router.route('/projects')
    .post(undergraduateController.addProject)
    .delete(undergraduateController.deleteProject)

router.route('/english-skill')
    .post(undergraduateController.addEnglishSkill)

router.route('/additional-information')
    .get(undergraduateController.getAdditionalInformation)

module.exports = router;