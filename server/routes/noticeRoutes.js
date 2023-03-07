const {Router} = require('express');
const noticeController = require('../controllers/noticeController');

const router = Router();

router.route('/create-notice')
    .post(noticeController.createNotice)

router.route('/edit-notice')
    .patch(noticeController.editNotice)
    
    
module.exports = router;