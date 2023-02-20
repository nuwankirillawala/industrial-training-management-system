const { Router } = require('express');
const adminController = require('../controllers/adminController');
const {requireAuth} = require('../middleware/authMiddleware');

const router = Router();

// router.route('/create-user/:userType')
//     .post(requireAuth, adminController.createUser)

router.route('/create-user/:userType')
    .post(adminController.createUser)

router.route('/view-all-users/:userType')
    .get(adminController.viewAllUsers)

router.route('/search-users/:userType')
    .get(adminController.searchUsers)

router.route('/create-company')
    .post(adminController.createCompany)

router.route('/:companyID/add-contact-person')
    .post(adminController.addContactPerson)

module.exports = router;