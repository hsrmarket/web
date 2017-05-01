'use strict';

var express = require('express');
var router = express.Router();
var appController = require('../controller/appController');
var util = require('../util/security');

/*
router.all('/*', util.handleAuthenticate);
*/

router.get("/index", appController.getFrontPage);

router.get("/books", appController.getArticles);

router.get("/electronics", appController.getArticles);

router.get("/officesupplies", appController.getArticles);

router.get("/other", appController.getArticles);

router.get("/recent", appController.getArticles);

router.get("/:id", appController.getArticlesByID);

router.get("/addArticle", appController.getAddArticle);

module.exports = router;
