const { Router } = require('express');
const resultController = require('../controllers/resultController');
const { restrictedTo } = require('../middleware/authMiddleware');
const { excelsheetUpload } = require('../middleware/uploadMiddleware');
const { deleteExistingResultSheet } = require('../middleware/deleteMiddleware');

const router = Router();

router.route('/upload-resultsheet')
    .post(restrictedTo('system-admin', 'department-coordinator'), deleteExistingResultSheet, excelsheetUpload, resultController.uploadResultSheetAndAddResult)

module.exports = router;