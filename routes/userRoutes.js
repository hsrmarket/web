/**
 * Created by felix_2 on 03.05.2017.
 */

var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');
var util = require('../util/security');

router.all('/*', util.handleAuthenticate);
/* User (My Account) */

router.put("/:id", userController.updateUserInformaion);

router.get("/:id/articles", userController.getMyArticle);

router.get("/:id/purchases", userController.getMyPurchases);

module.exports = router;