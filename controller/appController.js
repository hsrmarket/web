var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var URL = "http://localhost:9000/Books";

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