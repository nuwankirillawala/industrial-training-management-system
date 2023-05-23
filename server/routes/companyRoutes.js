const { Router } = require('express');
const companyController = require('../controllers/companyController');

const router = Router();

router.route('/create')
    .post(companyController.createCompany)

router.route('/:companyId/profile')
    .get(companyController.getCompanyProfile)
    .patch(companyController.updateCompanyProfile)

router.route('/all')
    .get(companyController.getAllCompanies)

router.route('/:companyId/contact-person')
    .post(companyController.addContactPerson)

router.route('/:companyId/ratings')
    .patch(companyController.editCompanyRating)

router.route('/:companyId/ratings/admin')
    .patch(companyController.editCompanyRatingByAdmin)

router.route('/:companyId/ratings/alumni')
    .patch(companyController.editCompanyRatingByAlumni )

router.route('/intern-process/company-list')
    .get(companyController.internProcessCompanyList)

router.route('/intern-process/company')
    .get(companyController.internProcessCompany)
    .post(companyController.updateCompanyInternApplicationList)

router.route('/intern-process/student')
    .patch(companyController.addCandidateToApplicationList)

router.route('/intern-process/recommendations')
    .patch(companyController.internProcess)

module.exports = router;