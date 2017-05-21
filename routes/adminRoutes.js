const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const util = require('../util/security');

router.all('/*', util.handleAuthenticate);

router.get('/', adminController.getOverviewPage);
router.get('/accounts', adminController.getManageAccounts);
router.get('/articles', adminController.getManageArticles);

module.exports = router;
