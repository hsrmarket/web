var express = require('express');
var router = express.Router();
var appController = require('../controller/appController');

/* GET home page. */
router.get('/', appController.showHome);

/* GET article */
router.post("/save", appController.postArticle);

/* GET article form*/
router.get("/createArticle", appController.createArticle);

/* POST article */
router.get("/fetch", appController.getArticle);

module.exports = router;
