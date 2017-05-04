'use strict';

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var authService = require("../service/authService");
var request = require('request');

var URL = "http://duernten.forrer.network:9000";

module.exports.getFrontPage = function (req, res) {
    res.render("home");
};

module.exports.postLogin = function (req, res) {
    if(!req.session.username) {
        authService.authenticate(req.body.username,req. body.password, function (data) {
            if(data) {
                var username = data.email;
                var userid = data.id;
                req.session.username = username;
                req.session.userid = userid;

                res.redirect("/api/articles/index");
            }
        });
    } else {
        res.redirect("/");
    }
};

module.exports.getLogin = function (req, res) {
    res.render('login');
};

module.exports.getRegister = function (req, res) {
    res.render('register');
};

module.exports.registerUser = function (req, res) {
    let options = {
        uri: URL + req.url,
        method: 'POST',
        json: {
            "studentID": req.body.studentID,
            "firstname": req.body.firstname,
            "lastname": req.body.lastname,
            "address": {
                "street": req.body.street,
                "streetNr": req.body.streetnr,
                "zip": req.body.zip,
                "city": req.body.city
            },
            "email": req.body.email,
            "telephone": req.body.telephone,
            "password": req.body.password
        }
    };

    try{
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.redirect("/api/user/login");
            }
        });
    } catch (err){
        console.log(err);
    }

};
module.exports.logout = function (req, res) {
    if(req.session.username) {
        req.session.username = null;
        res.redirect("/");
    }
};