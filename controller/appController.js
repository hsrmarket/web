'use strict';

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = require('request');

var URL = "http://duernten.forrer.network:9000/api/articles";
var storageService = require("../service/storageService");
var articleService = require("../service/articleService");

/* Artiekl */

module.exports.getFrontPage = function (req, res) {
    var http = new XMLHttpRequest();
    var url = URL + "/recent";
    var methode = "GET";

    http.open(methode, url, true);
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status === 200) {
            var articles = JSON.parse(http.responseText);
            res.render('index', {articles : articles, username : req.session.username, isadmin : req.session.isadmin});
        }
    };

    http.send();
};

module.exports.getRechtliches = function (req, res) {
    res.render('rechtliches', {title : "HSRmarket - Rechtliches", username : req.session.username, isadmin : req.session.isadmin});
};

module.exports.getImpressum = function (req, res) {
    res.render('impressum', {title : "HSRmarket - Impressum", username : req.session.username, isadmin : req.session.isadmin});
};

module.exports.getContact= function (req, res) {
    res.render('kontakt', {title : "HSRmarket - Kontakt", username : req.session.username, isadmin : req.session.isadmin});
};


module.exports.getArticles = function (req, res) {
    var http = new XMLHttpRequest();
    var url = URL + req.url;
    var methode = "GET";
    http.open(methode, url, true);
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status == 200) {
            var articles = JSON.parse(http.responseText);
            var title = req.url.split("/").pop();

            res.render('showArticles', {title : title, articles : articles, username : req.session.username, isadmin : req.session.isadmin});
        }
    };
    http.send();
};

function getImageOfArticle(imageFiled) {
    console.log(imageFiled);
    if (imageFiled == "" || imageFiled == null) {
        return "/images/icon_q_dooted.png";

    } else {
        return "/articleImages/" + imageFiled;
    }
};

module.exports.getArticlesByID = function (req, res) {
    var http = new XMLHttpRequest();
    var url = URL + req.url;
    var methode = "GET";

    http.open(methode, url, true);
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status === 200) {
            var articles = JSON.parse(http.responseText);
            var title = req.url.split("/").pop();

            var articleImage = getImageOfArticle(articles.image);
            res.render('articleView', {title : title, articles : articles, articleImage : articleImage, username : req.session.username, isadmin : req.session.isadmin});
        }
    };
    http.send();
};

module.exports.getAddArticle = function (req, res) {
    res.render("articleCreate");
};

module.exports.editArticleByID = function (req, res) {
    var http = new XMLHttpRequest();
    var articleURL = req.url;
    var articleID =  articleURL.replace('/edit','');
    var url = URL + articleID;
    var methode = "GET";

    http.open(methode, url, true);
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status === 200) {
            var article = JSON.parse(http.responseText);
            var title = req.url.split("/").pop();

            var articleImage = getImageOfArticle(article.image);
            res.render('articleUpdate', {title : title, article : article, username : req.session.username, articleImage : articleImage, isadmin : req.session.isadmin});
        }
    };
    http.send();
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
    var articleID =  articleURL.replace('/delete','');
    var updateURL = URL  + articleID;

    var options = {
        url: updateURL,
        method: 'DELETE'
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.redirect("/admin/articles");
        } else {
            res.render("displayError", { title : "HSRmarket - Error", message : error});
        }
    });
};


/* Kaufaufträge */


/* Suche */