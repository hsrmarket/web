/**
 * Created by Urs Forrer on 05.05.2017.
 */

const express = require('express');
const router = express.Router();
const purchaseController = require('../controller/purchaseController');
const util = require('../util/security');

router.all('/*', util.handleAuthenticate);

/* Account*/

router.post('/', purchaseController.addPurchase);
router.get('/:id/receipt', purchaseController.getReceipt);

module.exports = router;
