'use strict';

var express = require('express');
var router = express.Router();

var mainController = require('../controller/mainController');

router.get('/', mainController.getIndexPage);
router.get('/home', mainController.getHomePage);
router.get('/rechtliches', mainController.getRechtlichesPage);
router.get('/impressum', mainController.getImpressumPage);
router.get('/kontakt', mainController.getContactPage);

module.exports = router;
