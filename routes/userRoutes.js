/**
 * Created by felix_2 on 03.05.2017.
 */

const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const util = require('../util/security');

router.all('/*', util.handleAuthenticate);
router.get('/', userController.getMyAccount);
router.get('/articles', userController.getMyArticle);
router.get('/sales', userController.getMySales);
router.get('/purchases', userController.getMyPurchases);

module.exports = router;
