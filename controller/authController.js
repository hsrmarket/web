'use strict';

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var authService = require("../service/authService");
var request = require('request');

var URL = "http://duernten.forrer.network:9000/api";

module.exports.getFrontPage = function (req, res) {
    res.render("home", {title : "HSRmarket - Home", css : true});
};

module.exports.postLogin = function (req, res) {
    if(!req.session.username) {
        authService.authenticate(req.body.username,req. body.password, function (data) {
            if(data) {
                var username = data.email;
                var userid = data.id;
                req.session.username = username;
                req.session.userid = userid;

                res.redirect("/");
            }
        });
    } else {
        res.redirect("/home");
    }
};

module.exports.getLogin = function (req, res) {
    res.render('login', {title : "HSRmarket - Login", css : true});
};

module.exports.getRegister = function (req, res) {
    res.render('register', {title : "HSRmarket - Register", css : true});
};

module.exports.registerUser = function (req, res) {

    var updateURL = URL + "/accounts";

    var jsonArray = {
        "studentID": parseInt(req.body.studentID),
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "address": {
            "street": req.body.street,
            "streetNr": req.body.streetnr,
            "zip": parseInt(req.body.zip),
            "city": req.body.city
        },
        "email": req.body.email,
        "telephone": req.body.telephone,
        "password": req.body.password
    };

    var jsonData = JSON.stringify(jsonArray);
    console.log(jsonData);

    var headers = {
        'Content-Type': "application/json"
    };

    var options = {
        url: updateURL,
        method: 'POST',
        headers: headers,
        body: jsonData
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.redirect("/user/login");
        } else {
            console.log(body);
        }
    });

};
module.exports.logout = function (req, res) {
    if(req.session.username) {
        req.session.username = null;
        res.redirect("/");
    }
};