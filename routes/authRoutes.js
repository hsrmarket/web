var express = require('express');
var router = express.Router();
var appController = require('../controller/appController');

/* User */

router.post("/api/user/login", appController.getLogin);
router.get("/api/user/login", appController.getLogin);

router.get("/api/user/register", appController.getRegister);
module.exports = router;
