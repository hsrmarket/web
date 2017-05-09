/**
 * Created by felix_2 on 03.05.2017.
 */

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var URL = "http://duernten.forrer.network:9000/api/user";

/* User (My Account)*/
/* Only Views, saving and other functionallity is handled over the other controllers */

module.exports.getMyAccount = function (req, res) {
    console.log("MYACCOUNT")
    var http = new XMLHttpRequest();
    var url = "http://rest.hsrmarket.ch:9000/api/accounts" + "/" + req.session.userid;
    console.log(url);
    var methode = "GET";

    http.open(methode, url, true);
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status === 200) {
            var data = JSON.parse(http.responseText);
            res.render('editUser', { data : data, username : req.session.username, userid : req.session.userid, pageTitle: "My Account", isadmin : req.session.isadmin});
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

            res.render('myArticles', { articles : articles, username : req.session.username, isadmin : req.session.isadmin});
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

            res.render('myPurchases', { articles : articles, username : req.session.username, isadmin : req.session.isadmin});
        }
    };
    http.send();
};

module.exports.getMySales = function (req, res) {
    var http = new XMLHttpRequest();
    var url = URL + "/" + req.session.userid + "/sales";
    var methode = "GET";
    http.open(methode, url, true);
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status == 200) {
            var sales = JSON.parse(http.responseText);

            res.render('mySales', { sales : sales, username : req.session.username, isadmin : req.session.isadmin});
        }
    };
    http.send();



}