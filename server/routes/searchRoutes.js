const { Router } = require('express');
const searchController = require('../controllers/searchController');

const router = Router();

router.route('/view-all-users/:userType')
    .get(searchController.viewAllUsers_get)

router.route('/search-users/:userType')
    .get(searchController.searchUsers_post)


module.exports = router;