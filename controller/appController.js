var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var URL = "http://duernten.forrer.network:9000/Books";

/*
* Prototype phase
* */

module.exports.showHome = function(req, res) {
    res.render('index');
};

module.exports.getArticle = function (req, res) {
    var http = new XMLHttpRequest();
    var url = URL;
    var methode = "GET";

    http.open(methode, url, true);
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            var books = JSON.parse(http.responseText);
            res.render('currentCollection', {books : books});
        }
    };

    http.send();
};

module.exports.createArticle = function (req, res) {
    res.render('createBook');
};

module.exports.postArticle = function (req, res){

    var http = new XMLHttpRequest();
    var url = URL;
    var methode = "POST";

    http.open(methode, url, true);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            var text = JSON.parse(http.responseText);
            res.render('success');
        }
    };

    http.send(JSON.stringify({ id: parseInt(req.body.id), iban: req.body.iban, author: req.body.author }));
};

/*
* Construction phase
* */

var URLConstruction = "http://duernten.forrer.network:9000";

module.exports.getFrontPage = function (req, res) {
    var http = new XMLHttpRequest();
    var url = URLConstruction + "/api/articles/recent";
    var methode = "GET";

    http.open(methode, url, true);
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            var articles = JSON.parse(http.responseText);
            res.render('index', {articles : articles});
        }
    };

    http.send();
};

module.exports.getArticles = function (req, res) {

    var http = new XMLHttpRequest();
    var url = URLConstruction + req.url;
    var methode = "GET";

    http.open(methode, url, true);
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            var articles = JSON.parse(http.responseText);
            res.render('currentCollection', {articles : articles});
        }
    };

    http.send();
};

module.exports.getArticlesByID = function (req, res) {

};
