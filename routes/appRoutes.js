'use strict';

var express = require('express');
var router = express.Router();
var appController = require('../controller/appController');
var util = require('../util/security');

router.get("/books", appController.getArticles);
router.get("/electronics", appController.getArticles);
router.get("/officesupplies", appController.getArticles);
router.get("/other", appController.getArticles);
router.get("/recent", appController.getArticles);
router.get("/padd", appController.getPreSelectionPage);
router.get("/add", appController.getAddPage);
router.post("/add", appController.addArticle);
router.get("/:id", appController.getArticlesByID);

router.all('/:id/edit', util.handleAuthenticate);
router.get("/:id/delete", appController.deleteArticle);
router.get("/:id/edit", appController.editArticleByID);
router.post("/:id/edit",appController.saveArticleToDB);

//router.all('/add', util.handleAuthenticate);
//router.all('/hello', util.handleAuthenticate);



module.exports = router;
