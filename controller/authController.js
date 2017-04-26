var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/* AUTH */

module.exports.getLogin = function (req, res) {
    res.render('login');
};

module.exports.getRegister = function (req, res) {
    res.render('register');
};