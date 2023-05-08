const { Router } = require('express');
const undergraduateController = require('../controllers/undergraduateController');
const { checkUser } = require('../middleware/authMiddleware');
const { cvUpload, imageUpload, excelsheetUpload } = require('../middleware/uploadMiddleware');

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

// ############################## Private Notes ##############################

router.route('/add-note')
    .post(undergraduateController.addNote)

router.route('/get-all-notes')
    .get(undergraduateController.getAllNotes)

router.route('/get-note/:noteId')
    .get(undergraduateController.getNote)

router.route('/edit-note')
    .patch(undergraduateController.editNote)

// ############################## Intern Process ##############################

router.route('/view-intern-list')
    .get(undergraduateController.viewInternList)

router.route('/company-selection')
    .get(undergraduateController.getCompanySelection)
    .patch(undergraduateController.updateCompanySelection)

router.route('/undergraduate-dashboard')
    .get(checkUser, undergraduateController.undergraduateDashboard)

router.route('/upload-resultsheet')
    .post(excelsheetUpload, undergraduateController.uploadResultSheetAndAddResult)

router.route('/set-weighted-gpa')
    .post(undergraduateController.setWeightedGPA)

// 🛑 This is a tempory route controller. just for checking 🛑
router.route('/add-intern-status')
    .patch(undergraduateController.addInternStatus)

router.route('/update-intern-status')
    .patch(undergraduateController.updateInternStatus)

router.route('/assign-supervisor/:undergraduateId')
    .get(undergraduateController.assignSupervisorGET)
    .patch(undergraduateController.assignSupervisorPATCH)

router.route('/update-internship')
    .patch(undergraduateController.updateInternship)

// ############################## Daily Reports ##############################

router.route('/view-all-daily-reports')
    .get(undergraduateController.viewAllDailyReports)

router.route('/view-daily-report/:weekNo')
    .get(undergraduateController.viewDailyReport);

router.route('/edit-daily-report')
    .post(undergraduateController.editDailyReport)

router.route('/edit-weekly-report-problem-section')
    .post(undergraduateController.editDailyReportProblemSection)

router.route('/submit-daily-report')
    .patch(undergraduateController.submitDailyReport)

router.route('/get-all-daily-reports/:undergraduateId')
    .get(undergraduateController.getAllDailyReports)

router.route('/get-daily-report/:undergraduateId/week/:weekNo')
    .get(undergraduateController.getDailyReport)

// ############################## Monthly Reports ##############################

router.route('/view-all-monthly-reports')
    .get(undergraduateController.viewAllMonthlyReports)

router.route('/view-monthly-report/:monthNo')
    .get(undergraduateController.viewMonthlyReport);

router.route('/edit-monthly-report-week')
    .post(undergraduateController.editMonthlyReportWeek)

router.route('/edit-monthly-report-problem-section')
    .post(undergraduateController.editMonthlyProblemSection)

router.route('/edit-monthly-leave-record')
    .post(undergraduateController.editMonthlyLeaveRecord)

router.route('/submit-monthly-report')
    .patch(undergraduateController.submitMonthlyReport)

router.route('/get-all-monthly-reports/:undergraduateId')
    .get(undergraduateController.getAllMonthlyReports)

router.route('/get-monthly-report/:undergraduateId/month/:monthNo')
    .get(undergraduateController.getDailyReport)

// ############################## CV Application ##############################

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

// ############################## Progress Report ##############################

router.route('progress-report/:internId')
    .post(undergraduateController.addProgressReport)
    .get(undergraduateController.getProgressReport)

// ############################## Final Feedback ##############################

router.route('final-feedback/:internId')
    .post(undergraduateController.addFinalFeedback)
    .get(undergraduateController.getFinalFeedback)


module.exports = router;