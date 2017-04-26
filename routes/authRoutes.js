var express = require('express');
var router = express.Router();
var authController = require('../controller/authController');

/* User */

router.post("/api/user/login", authController.getLogin);
router.get("/api/user/login", authController.getLogin);

router.get("/api/user/register", authController.getRegister);

module.exports = router;
