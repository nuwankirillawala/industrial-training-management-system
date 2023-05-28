const { Router } = require('express');
const resultController = require('../controllers/resultController');
const { restrictedTo } = require('../middleware/authMiddleware');
const { excelsheetUpload } = require('../middleware/uploadMiddleware');
const { deleteExistingResultSheet } = require('../middleware/deleteMiddleware');

const router = Router();

router.route('/upload')
    .post(restrictedTo('system-admin', 'department-coordinator'), deleteExistingResultSheet, excelsheetUpload, resultController.uploadResultSheetAndAddResult)

router.route('/all')
    .get(restrictedTo('system-admin', 'department-coordinator'), resultController.getResults)

router.route('/individual')
    .get(restrictedTo('undergraduate'), resultController.individualResults)


module.exports = router;