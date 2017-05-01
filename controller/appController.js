'use strict';

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var URL = "http://duernten.forrer.network:9000/api/articles";

module.exports.getFrontPage = function (req, res) {
    var http = new XMLHttpRequest();
    var url = URL + "/recent";
    var methode = "GET";

    http.open(methode, url, true);
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status === 200) {
            var articles = JSON.parse(http.responseText);
            var username = req.session.username;
            var userid = 12;
            res.render('index', {articles : articles, username : username, userid : userid});
        }
    };

    http.send();
};


module.exports.getArticles = function (req, res) {
    console.log("HAHA I AM HERE catch me if our can");
    var http = new XMLHttpRequest();
    var url = URL + req.url;
    var methode = "GET";
    http.open(methode, url, true);
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status == 200) {
            var articles = JSON.parse(http.responseText);
            var title = req.url.split("/").pop();

            var username = req.session.username;
            var userid = 12;

            res.render('articleList', {title : title, articles : articles, username : username, userid : userid});
        }
    };
    http.send();
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

            var username = req.session.username;
            var userid = 12;

            res.render('detailedView', {title : title, articles : articles, username : username, userid : userid});
        }
    };
    http.send();
};

module.exports.getAddArticle = function (req, res) {
    console.log("createUpdate things");
    res.render("createUpdate");
};