const { Router } = require('express');
const companyController = require('../controllers/companyController');

const router = Router();

router.route('/create-company')
    .post(adminController.createCompany)

router.route('/:companyID/add-contact-person')
    .post(adminController.addContactPerson)

router.route('/:companyID/edit-rating')
    .post(adminController.editCompanyRating)

module.exports = router;