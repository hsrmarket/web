/**
 * Created by Urs Forrer on 05.05.2017.
 */

var express = require('express');
var router = express.Router();
var purchaseController = require('../controller/purchaseController');
var util = require('../util/security');

router.all('/*', util.handleAuthenticate);

/* Account*/

router.post("/", purchaseController.addPurchase);

router.get("/:id/reciept", purchaseController.patchStatus);

module.exports = router;