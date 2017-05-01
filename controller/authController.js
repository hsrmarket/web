'use strict';

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var authService = require("../service/authService");

var URL = "http://duernten.forrer.network:9000/";

module.exports.getFrontPage = function (req, res) {
    res.render("home");
};

module.exports.postLogin = function (req, res) {
    if(!req.session.username) {
        authService.authenticate(req.body.username,req. body.password, function (err, valid) {
            if(valid) {
                var username = req.body.username;
                var userid = 12;
                req.session.username = req.body.username;
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

module.exports.logout = function (req, res) {
    if(req.session.username) {
        req.session.username = null;
        res.redirect("/");
    }
};