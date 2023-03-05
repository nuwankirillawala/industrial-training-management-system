const {Router} = require('express');
const noticeController = require('../controllers/noticeController');

const router = Router();

router.route('/create-notice')
    .post(noticeController.createNotice)

module.exports = router;