const express = require('express');
const router = express.Router();

const mainController = require('../controller/mainController');

router.get('/', mainController.getIndexPage);
router.get('/home', mainController.getHomePage);
router.get('/rechtliches', mainController.getRechtlichesPage);
router.get('/impressum', mainController.getImpressumPage);
router.get('/kontakt', mainController.getContactPage);

module.exports = router;
