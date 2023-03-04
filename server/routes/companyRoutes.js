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

module.exports = router;