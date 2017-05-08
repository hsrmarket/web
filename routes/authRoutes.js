'use strict';

var express = require('express');
var router = express.Router();

var authController = require('../controller/authController');
var appController = require('../controller/appController');

router.get('/', appController.getFrontPage)
router.get('/home', authController.getFrontPage);

router.get("/user/login", authController.getLogin);
router.post("/user/login", authController.postLogin);

router.get("/user/register", authController.getRegister);
router.post("/user/register", authController.registerUser);
router.get("/user/logout", authController.logout);

module.exports = router;
