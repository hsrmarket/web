'use strict';

var express = require('express');
var router = express.Router();

var authController = require('../controller/authController');

router.get("/login", authController.getLoginPage);
router.post("/login", authController.postLogin);

router.get("/register", authController.getRegisterPage);
router.post("/register", authController.registerUser);
router.get("/logout", authController.logout);

module.exports = router;
