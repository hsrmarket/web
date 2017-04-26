var express = require('express');
var router = express.Router();
var appController = require('../controller/appController');

router.get('/', appController.getFrontPage);

/*DELETE /api/articles/:id*/
/*
router.put("/api/articles/:id", );
router.post('/api/articles/', );
router.get('/api/articles/', );
*/

router.get("/api/articles/books", appController.getArticles);

router.get("/api/articles/electronics", appController.getArticles);

router.get("/api/articles/officesupplies", appController.getArticles);

router.get("/api/articles/other", appController.getArticles);

router.get("/api/articles/recent", appController.getArticles);

router.get("/api/articles/:id", appController.getArticlesByID);

/*
router.delete("/api/accounts/:id", );

router.post("/api/accounts", );
router.get("/api/accounts", );
router.get("/api/accounts/:id", );
*/

/* User */

router.post("/api/user/login", appController.getLogin);
router.get("/api/user/login", appController.getLogin);

router.get("/api/user/register", appController.getRegister);

module.exports = router;
