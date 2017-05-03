/**
 * Created by felix_2 on 03.05.2017.
 */

var express = require('express');
var router = express.Router();
var accountController = require('../controller/accountController');
var util = require('../util/security');

router.all('/*', util.handleAuthenticate);

/* Account*/

router.get("/:id", accountController.getAccountDetailsByID);

module.exports = router;