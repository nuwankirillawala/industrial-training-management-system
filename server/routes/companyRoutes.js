const { Router } = require('express'); 
const companyController = require('../controllers/companyController');

const router = Router();

router.route('/create-company')
    .post(adminController.createCompany)


    module.exports = router;