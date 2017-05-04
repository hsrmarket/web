/**
 * Created by felix_2 on 03.05.2017.
 */

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var URL = "http://duernten.forrer.network:9000/api/user";

/* User (My Account)*/

module.exports.updateUserInformaion = function (req, res) {
    //TODO Elias
    var http = new XMLHttpRequest();
    var url = URL + req.session.userid;
    var methode = "POST";

    http.open(methode, url, true);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            var text = JSON.parse(http.responseText);
            res.render('success');
        }
    };
    http.send();
};

module.exports.getMyArticle = function (req, res) {
    var http = new XMLHttpRequest();
    var url = URL + req.url;
    var methode = "GET";
    http.open(methode, url, true);
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status == 200) {
            var articles = JSON.parse(http.responseText);

            var username = req.session.username;
            var userid = req.session.userid;

            res.render('myArticles', { articles : articles, username : username, userid : userid});
        }
    };
    http.send();
};

module.exports.getMyPurchases = function (req, res) {
    var http = new XMLHttpRequest();
    var url = URL + req.url;
    var methode = "GET";
    http.open(methode, url, true);
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status == 200) {
            var articles = JSON.parse(http.responseText);

            var username = req.session.username;
            var userid = req.session.userid;

            res.render('myPurchases', { articles : articles, username : username, userid : userid});
        }
    };
    http.send();
};
