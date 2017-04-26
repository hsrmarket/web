var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/* AUTH */
var URL = "http://duernten.forrer.network:9000/Books";

module.exports.getLogin = function (req, res) {
    res.render('login');
};

module.exports.getRegister = function (req, res) {
    res.render('register');
};