const express = require('express');
const router = express.Router();
const purchaseController = require('../controller/purchaseController');
const util = require('../util/security');

router.all('/*', util.handleAuthenticate);

/* Account*/


router.post("/", purchaseController.addPurchase);
router.get("/:id", purchaseController.patchStatus);
router.get("/:id/receipt", purchaseController.getReceipt);

module.exports = router;
