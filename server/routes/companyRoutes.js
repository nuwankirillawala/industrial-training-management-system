const { Router } = require('express');
const companyController = require('../controllers/companyController');

const router = Router();

router.route('/create-company')
    .post(companyController.createCompany)

router.route('/:companyID/add-contact-person')
    .post(companyController.addContactPerson)

router.route('/:companyID/edit-rating')
    .post(companyController.editCompanyRating)

router.route('/intern-process-company-list')
    .get(companyController.internProcessCompanyList)

router.route('/intern-process-company')
    .get(companyController.internProcessCompany)
    .post(companyController.updateCompanyInternApplicationList)

router.route('/intern-process-student')
    .patch(companyController.addCandidateToApplicationList)

router.route('/intern-process')
    .patch(companyController.internProcess)

module.exports = router;