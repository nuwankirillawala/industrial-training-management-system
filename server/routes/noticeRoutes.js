const { Router } = require('express');
const noticeController = require('../controllers/noticeController');

const router = Router();

router.route('/')
    .get(noticeController.viewNotice)
    .post(noticeController.createNotice)
    .patch(noticeController.editNotice)
    .delete(noticeController.deleteNotice)

router.route('/all')
    .get(noticeController.viewAllNotices)

module.exports = router;