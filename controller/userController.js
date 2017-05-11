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

module.exports.getMyAccount = function (req, res) {
    console.log("MYACCOUNT");
    var http = new XMLHttpRequest();
    var url = "http://rest.hsrmarket.ch:9000/api/accounts" + "/" + req.session.userid;
    console.log(url);
    var methode = "GET";

    http.open(methode, url, true);
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status === 200) {
            var data = JSON.parse(http.responseText);
            res.render('account', { data : data, username : req.session.username, pageTitle: "My Account"});
        }
    };
    http.send();
};

module.exports.getMyArticle = function (req, res) {
    var http = new XMLHttpRequest();
    var url = URL + "/" + req.session.userid + "/articles";
    var methode = "GET";
    http.open(methode, url, true);
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status == 200) {
            var articles = JSON.parse(http.responseText);

            res.render('myArticles', { articles : articles, username : req.session.username});
        }
    };
    http.send();
};

module.exports.getMyPurchases = function (req, res) {
    var http = new XMLHttpRequest();
    var url = URL + "/" + req.session.userid + "/purchases";
    var methode = "GET";
    http.open(methode, url, true);
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status == 200) {
            var articles = JSON.parse(http.responseText);

            res.render('myPurchases', { articles : articles, username : req.session.username});
        }
    };
    http.send();
};

module.exports.getMySales = function (req, res) {
    console.log("Ich bin hier");
    var http = new XMLHttpRequest();
    var url = URL + "/" + req.session.userid + "/sales";
    var methode = "GET";
    http.open(methode, url, true);
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status == 200) {
            var sales = JSON.parse(http.responseText);

            res.render('mySales', { sales : sales, username : req.session.username});
        }
    };
    http.send();
};