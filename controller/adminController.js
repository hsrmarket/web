/**
 * Created by urs on 09.05.17.
 */

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var BaseURL = "http://rest.hsrmarket.ch:9000/api";

module.exports.getOverviewPage = function (req, res) {
    res.render('adminpanel', {title : "HSRmarket - Admin Panel", username : req.session.username, isadmin : req.session.isadmin});
};

module.exports.getManageAccounts = function (req, res) {
    var http = new XMLHttpRequest();
    var url = BaseURL + "/accounts";
    var methode = "GET";
    http.open(methode, url, true);
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status == 200) {
            var accounts = JSON.parse(http.responseText);

            res.render('accountsList', {title : "Manage Accounts", accounts : accounts, username : req.session.username, isadmin : req.session.isadmin});
        }
    };
    http.send();
};

module.exports.getManageArticles = function (req, res) {
    var http = new XMLHttpRequest();
    var url = BaseURL + "/articles";
    var methode = "GET";
    http.open(methode, url, true);
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status == 200) {
            var articles = JSON.parse(http.responseText);

            res.render('articlesList', {title : "Manage Articles", articles : articles, username : req.session.username, isadmin : req.session.isadmin});
        }
    };
    http.send();
};