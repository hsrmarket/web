'use strict';

var express = require('express');
var router = express.Router();
var app = express();
var appController = require('../controller/appController');
var util = require('../util/security');

router.get("/books", appController.getArticles);
router.get("/electronics", appController.getArticles);
router.get("/officesupplies", appController.getArticles);
router.get("/other", appController.getArticles);
router.get("/recent", appController.getArticles);
router.get("/:id", appController.getArticlesByID);

router.all('/:id/edit', util.handleAuthenticate);
router.get("/new", appController.getFrontPage);
router.get("/:id/delete", appController.deleteArticle);
router.get("/:id/edit", appController.editArticleByID);
router.post("/:id/edit",appController.saveArticleToDB);

module.exports = router;
