'use strict';

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = require('request');

var URL = "http://duernten.forrer.network:9000/api/articles";

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
}


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

            res.render('articleView', {title : title, articles : articles, username : req.session.username, isadmin : req.session.isadmin});
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

            res.render('articleUpdate', {title : title, article : article, username : req.session.username, isadmin : req.session.isadmin});
        }
    };
    http.send();
};

module.exports.saveArticleToDB = function (req, res) {
    var updateURL = URL + "/" + req.body.id;
    switch(req.body.type) {
        case "book":
            var options = {
                "id": parseInt(req.body.id),
                "name": req.body.name,
                "price": parseFloat(req.body.price),
                "condition": parseInt(req.body.condition),
                "description": req.body.description,
                "creationDate": req.body.creationDate,
                "image": req.body.image,
                "type": req.body.type,
                "isbn": req.body.isbn,
                "author": req.body.author,
                "publisher": req.body.publisher
            };
            break;
        case "electronic":
            var options = {
                "id": parseInt(req.body.id),
                "name": req.body.name,
                "price": parseFloat(req.body.price),
                "condition": parseInt(req.body.condition),
                "description": req.body.description,
                "creationDate": req.body.creationDate,
                "image": req.body.image,
                "type": req.body.type,
                "producer": req.body.producer,
                "model": req.body.model
            };
            break;
        default:
            var options = {
                "id": parseInt(req.body.id),
                "name": req.body.name,
                "price": parseFloat(req.body.price),
                "condition": parseInt(req.body.condition),
                "description": req.body.description,
                "creationDate": req.body.creationDate,
                "image": req.body.image,
                "type": req.body.type
            };
            break;

    }

    var jsonData = JSON.stringify(options);

    var headers = {
        'Content-Type': "application/json"
    };

    var options = {
        url: updateURL,
        method: 'PUT',
        headers: headers,
        body: jsonData
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var redirect = "";
            if (req.session.isadmin) {
                redirect = "/admin/articles";
            }
            else {
                redirect = "/articles/" + req.body.id;
            }
            res.redirect(redirect);
        } else {
            console.log(body);
        }
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
            console.log(body);
        }
    });
};


/* Kaufaufträge */


/* Suche */