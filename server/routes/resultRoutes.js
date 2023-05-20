const { Router } = require('express');
const resultController = require('../controllers/resultController');
const { restrictedTo } = require('../middleware/authMiddleware');
const { excelsheetUpload } = require('../middleware/uploadMiddleware');

const router = Router();

router.route('/upload-resultsheet')
    // .post(restrictedTo('system-admin', 'department-coordinator'), excelsheetUpload, resultController.uploadResultSheetAndAddResult)
    .post(restrictedTo('system-admin', 'department-coordinator'), resultController.uploadResultSheetAndAddResult)


module.exports = router;