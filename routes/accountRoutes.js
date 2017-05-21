const express = require('express');
const router = express.Router();
const accountController = require('../controller/accountController');
const util = require('../util/security');

router.all('/*', util.handleAuthenticate);

/* Account*/

router.get('/:id/edit', accountController.getAccountDetailsByID);
router.post('/:id', accountController.saveAccountToDB);
router.get('/:id/delete', accountController.deleteAccount);

module.exports = router;
