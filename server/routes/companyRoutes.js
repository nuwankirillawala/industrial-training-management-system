const { Router } = require('express');
const companyController = require('../controllers/companyController');

const router = Router();

router.route('/create')
    .post(companyController.createCompany)

router.route('/:companyId/profile')
    .get(companyController.getCompanyProfile)
    .patch(companyController.updateCompanyProfile)

router.route('/:companyId/contact-person')
    .post(companyController.addContactPerson)

router.route('/:companyId/ratings')
    .patch(companyController.editCompanyRating)

router.route('/intern-process-company-list')
    .get(companyController.internProcessCompanyList)

router.route('/intern-process/company')
    .get(companyController.internProcessCompany)
    .post(companyController.updateCompanyInternApplicationList)

router.route('/intern-process/student')
    .patch(companyController.addCandidateToApplicationList)

router.route('/intern-process/recommendations')
    .patch(companyController.internProcess)

module.exports = router;