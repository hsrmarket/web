'use strict';

var express = require('express');
var router = express.Router();

var authController = require('../controller/authController');

router.get('/', authController.getFrontPage);

router.get("/api/user/login", authController.getLogin);
router.post("/api/user/login", authController.postLogin);

router.get("/api/user/register", authController.getRegister);
router.post("/api/accounts", authController.registerUser);

router.get("/api/user/logout", authController.logout);

module.exports = router;
