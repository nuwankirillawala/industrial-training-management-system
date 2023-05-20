const { Router } = require('express');
const undergraduateController = require('../controllers/undergraduateController');
const { restrictedTo } = require('../middleware/authMiddleware');
const { cvUpload, imageUpload } = require('../middleware/uploadMiddleware');
const { deleteExistingImage } = require('../middleware/deleteMiddleware');

const router = Router();

router.route('/create')
    .post(restrictedTo('system-admin', 'department-coordinator'), undergraduateController.createUndergraduate)

router.route('/view/:undergraduateId')
    .get(restrictedTo('system-admin', 'department-coordinator'), undergraduateController.getUndergraduate)

router.route('/get')
    .get(restrictedTo('undergraduate'), undergraduateController.viewProfile)

router.route('/update')
    .patch(restrictedTo('undergraduate'), undergraduateController.updateProfile)

router.route('/update-profile-image')
    .patch(restrictedTo('undergraduate'), deleteExistingImage, imageUpload, undergraduateController.updateProfileImage)


router.route('/view-all')
    .get(restrictedTo('system-admin', 'department-coordinator'), undergraduateController.viewAll)

// ############################## Private Notes ##############################

router.route('/add-note')
    .post(restrictedTo('undergraduate'), undergraduateController.addNote)

router.route('/get-all-notes')
    .get(restrictedTo('undergraduate'), undergraduateController.getAllNotes)

router.route('/get-note/:noteId')
    .get(restrictedTo('undergraduate'), undergraduateController.getNote)

router.route('/edit-note')
    .patch(restrictedTo('undergraduate'), undergraduateController.editNote)

// ############################## Intern Process ##############################

router.route('/view-intern-list')
    .get(restrictedTo('system-admin', 'department-coordinator'), undergraduateController.viewInternList)

router.route('/company-selection')
    .get(restrictedTo('undergraduate'), undergraduateController.getCompanySelection)
    .patch(restrictedTo('undergraduate'), undergraduateController.updateCompanySelection)

router.route('/undergraduate-dashboard')
    .get(restrictedTo('undergraduate'), undergraduateController.undergraduateDashboard)

router.route('/set-weighted-gpa')
    .post(restrictedTo('system-admin', 'department-coordinator'), undergraduateController.setWeightedGPA)

// 🛑 This is a tempory route controller. just for checking 🛑
router.route('/add-intern-status')
    .patch(undergraduateController.addInternStatus)

router.route('/update-intern-status')
    .patch(restrictedTo('undergraduate'), undergraduateController.updateInternStatus)

router.route('/assign-supervisor/:undergraduateId')
    .get(restrictedTo('system-admin', 'department-coordinator'), undergraduateController.assignSupervisorGET)
    .patch(restrictedTo('system-admin', 'department-coordinator'), undergraduateController.assignSupervisorPATCH)

router.route('/update-internship')
    .patch(restrictedTo('undergraduate'), undergraduateController.updateInternship)

// ############################## Daily Reports ##############################

router.route('/view-all-daily-reports')
    .get(restrictedTo('undergraduate'), undergraduateController.viewAllDailyReports)

router.route('/view-daily-report/:weekNo')
    .get(restrictedTo('undergraduate'), undergraduateController.viewDailyReport);

router.route('/edit-daily-report')
    .post(restrictedTo('undergraduate'), undergraduateController.editDailyReport)

router.route('/edit-weekly-report-problem-section')
    .post(restrictedTo('undergraduate'), undergraduateController.editDailyReportProblemSection)

router.route('/submit-daily-report')
    .patch(restrictedTo('undergraduate'), undergraduateController.submitDailyReport)

router.route('/get-all-daily-reports/:undergraduateId')
    .get(restrictedTo('system-admin', 'department-coordinator'), undergraduateController.getAllDailyReports)

router.route('/get-daily-report/:undergraduateId/week/:weekNo')
    .get(restrictedTo('system-admin', 'department-coordinator'), undergraduateController.getDailyReport)

// ############################## Monthly Reports ##############################

router.route('/view-all-monthly-reports')
    .get(restrictedTo('undergraduate'), undergraduateController.viewAllMonthlyReports)

router.route('/view-monthly-report/:monthNo')
    .get(restrictedTo('undergraduate'), undergraduateController.viewMonthlyReport);

router.route('/edit-monthly-report-week')
    .post(restrictedTo('undergraduate'), undergraduateController.editMonthlyReportWeek)

router.route('/edit-monthly-report-problem-section')
    .post(restrictedTo('undergraduate'), undergraduateController.editMonthlyProblemSection)

router.route('/edit-monthly-leave-record')
    .post(restrictedTo('undergraduate'), undergraduateController.editMonthlyLeaveRecord)

router.route('/submit-monthly-report')
    .patch(restrictedTo('undergraduate'), undergraduateController.submitMonthlyReport)

router.route('/get-all-monthly-reports/:undergraduateId')
    .get(restrictedTo('system-admin', 'department-coordinator'), undergraduateController.getAllMonthlyReports)

router.route('/get-monthly-report/:undergraduateId/month/:monthNo')
    .get(restrictedTo('system-admin', 'department-coordinator'), undergraduateController.getDailyReport)

// ############################## CV Application ##############################

router.route('/upload-cv')
    .post(restrictedTo('undergraduate'), cvUpload, undergraduateController.uploadCV)

router.route('/soft-skill')
    .post(restrictedTo('undergraduate'), undergraduateController.addSoftSkill)
    .delete(restrictedTo('undergraduate'), undergraduateController.deleteSoftSkill)

router.route('/technology-skill')
    .post(restrictedTo('undergraduate'), undergraduateController.addTechnologySkill)
    .delete(restrictedTo('undergraduate'), undergraduateController.deleteTechnologySkill)

router.route('/certifications')
    .post(restrictedTo('undergraduate'), undergraduateController.addCertifications)
    .delete(restrictedTo('undergraduate'), undergraduateController.deleteCertifications)

router.route('/extra-activities')
    .post(restrictedTo('undergraduate'), undergraduateController.addExtraActivities)
    .delete(restrictedTo('undergraduate'), undergraduateController.deleteExtraActivities)

router.route('/projects')
    .post(restrictedTo('undergraduate'), undergraduateController.addProject)
    .delete(restrictedTo('undergraduate'), undergraduateController.deleteProject)

router.route('/english-skill')
    .post(restrictedTo('undergraduate'), undergraduateController.addEnglishSkill)

router.route('/additional-information')
    .get(undergraduateController.getAdditionalInformation)

// ############################## Progress Report ##############################

router.route('progress-report/:internId')
    .post(restrictedTo('supervisor'), undergraduateController.addProgressReport)
    .get(restrictedTo('system-admin', 'department-coordinator', 'supervisor'), undergraduateController.getProgressReport)

// ############################## Final Feedback ##############################

router.route('final-feedback/:internId')
    .post(restrictedTo('supervisor'), undergraduateController.addFinalFeedback)
    .get(restrictedTo('system-admin', 'department-coordinator', 'supervisor'), undergraduateController.getFinalFeedback)

// get report admin supervisor have differnt perspectives

module.exports = router;