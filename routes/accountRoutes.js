/**
 * Created by felix_2 on 03.05.2017.
 */

let express = require('express');
let router = express.Router();
let accountController = require('../controller/accountController');
let util = require('../util/security');

router.all('/*', util.handleAuthenticate);

/* Account*/

router.post("/", accountController.registerNewUser);

router.get("/:id", accountController.getAccountDetailsByID);

module.exports = router;