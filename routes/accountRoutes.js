/**
 * Created by felix_2 on 03.05.2017.
 */

var express = require('express');
var router = express.Router();
var accountController = require('../controller/accountController');
var util = require('../util/security');

router.all('/*', util.handleAuthenticate);

/* Account*/

router.get("/:id/edit", accountController.getAccountDetailsByID);
router.post("/:id",accountController.saveAccountToDB);
router.get("/:id/delete", accountController.deleteAccount);


module.exports = router;