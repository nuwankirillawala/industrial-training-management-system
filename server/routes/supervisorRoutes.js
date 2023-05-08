const { Router } = require('express');
const supervisorController = require('../controllers/supervisorController');

const router = Router();

router.route('/create-supervisor')
    .post(supervisorController.createSupervisor)


module.exports = router;