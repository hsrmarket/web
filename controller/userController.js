/**
 * Created by felix_2 on 03.05.2017.
 */

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = require('request');

var URL = "http://rest.hsrmarket.ch:9000/api/user";
var BaseURL = "http://rest.hsrmarket.ch:9000/api/";

/* User (My Account)*/
/* Only Views, saving and other functionallity is handled over the other controllers */

module.exports.getMyAccount = function (req, res) {
    var http = new XMLHttpRequest();
    var url = BaseURL + "accounts" + "/" + req.session.userid;
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
};

module.exports.getPreSelection = function (req, res) {
    res.render("preSelection");
};

module.exports.getAddArticle = function (req, res) {
    let type = req.query.type;
    res.render("addArticle", {article : {type : type} });
};

module.exports.postAddArticle = function (req, res) {
    console.log(req.body);

    var options = {
        uri: BaseURL + "articles",
        method: 'POST',
        json: {
            "id": req.session.userid,
            "type": req.body.type,
            "price": req.body.price,
            "name": req.body.name,
            "condition": req.body.condition,
            "description": req.body.description,
            "isbn": req.body.isbn,
            "publisher": req.body.publisher,
            "author": req.body.author,
            "image": req.body.image
        }
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Added article successfully");
            console.log(body);
            res.render("success");
        } else {
            console.log("Error while adding a new article");
            console.log(error);
        }
    });
};
