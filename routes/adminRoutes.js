var express = require('express');
var router = express.Router();
var adminController = require('../controller/adminController');
var util = require('../util/security');

router.all('/*', util.handleAuthenticate);

router.get("/", adminController.getOverviewPage);
router.get("/accounts", adminController.getManageAccounts);
router.get("/articles", adminController.getManageArticles);

module.exports = router;