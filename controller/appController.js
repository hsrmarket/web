'use strict';

var request = require('request');

var URL = "http://duernten.forrer.network:9000/api/articles";
var storageService = require("../service/storageService");
var articleService = require("../service/articleService");

module.exports.getAddArticlePage = function (req, res) {
    res.render("articleCreate");
};

module.exports.getArticles = function (req, res) {
    articleService.getList(req.url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var articles = JSON.parse(body);
            var title = req.url.split("/").pop();
            res.render('showArticles', {title : title, articles : articles, username : req.session.username, isadmin : req.session.isadmin});
        } else {
            res.render("displayError", { title : "HSRmarket - Error", message : error});
        }
    });
};

function getImageOfArticle(imageFiled) {
    if (imageFiled == "" || imageFiled == null) {
        return "/images/icon_q_dooted.png";

    } else {
        return "/articleImages/" + imageFiled;
    }
};

module.exports.getArticlesByID = function (req, res) {
    var articleURL = req.url;
    var articleID =  articleURL.replace('/','');

    articleService.get(articleID, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var article = JSON.parse(body);
            var articleImage = getImageOfArticle(article.image);
            var title = "HSRmarket - " + article.name;
            res.render('articleView', {title : title, articles : article, articleImage : articleImage, username : req.session.username, isadmin : req.session.isadmin});
        } else {
            res.render("displayError", { title : "HSRmarket - Error", message : error});
        }
    });
};


module.exports.editArticleByID = function (req, res) {
    var articleURL = req.url;
    var articleID =  articleURL.replace('/edit','').replace('/', '');

    articleService.get(articleID, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var article = JSON.parse(body);
            var articleImage = getImageOfArticle(article.image);
            var title = "HSRmarket - " + article.name;
            res.render('articleUpdate', {title : title, article : article, username : req.session.username, articleImage : articleImage, isadmin : req.session.isadmin});
        } else {
            res.render("displayError", { title : "HSRmarket - Error", message : error});
        }
    });
};

module.exports.saveArticleToDB = function (req, res) {
    storageService.uploadImage(req, res, function (err, value) {
        if (err) {
            res.render("displayError", { title : "HSRmarket - Error", message : err});
            return;
        }
        articleService.saveData(value, function (error, response, body) {
            if (error && response.statusCode != 200) {
                console.log("ERORR");
            } else {
                var redirect = "";
                if (req.session.isadmin) {
                    redirect = "/admin/articles";
                }
                else {
                    redirect = "/articles/" + req.body.id;
                }
                res.redirect(redirect);
            }
        });
    });
};

module.exports.deleteArticle = function (req, res) {
    var articleURL = req.url;
    var articleID =  articleURL.replace('/delete','').replace('/', '');

    articleService.delete(articleID, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.redirect("/admin/articles");
        } else {
            res.render("displayError", { title : "HSRmarket - Error", message : error});
        }
    })
};