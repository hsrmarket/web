var express = require('express');
var router = express.Router();
var appController = require('../controller/appController');

/*
* Prototype phase
* */

/* GET home page. */
/*router.get('/', appController.showHome);*/

/* GET article */
router.post("/save", appController.postArticle);

/* GET article form*/
router.get("/createArticle", appController.createArticle);

/* POST article */
router.get("/fetch", appController.getArticle);

/*
* Construction phase
* */
router.get('/', appController.getFrontPage);

router.get("/api/articles/books", appController.getArticles);

router.get("/api/articles/electronics", appController.getArticles);

router.get("/api/articles/officesupplies", appController.getArticles);

router.get("/api/articles/other", appController.getArticles);

router.get("/api/articles/recent", appController.getArticles);

router.get("/api/articles/:id", appController.getArticlesByID);

module.exports = router;
