'use strict';

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var authService = require("../service/authService");

var URL = "http://duernten.forrer.network:9000/";

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

module.exports.logout = function (req, res) {
    if(req.session.username) {
        req.session.username = null;
        res.redirect("/");
    }
};