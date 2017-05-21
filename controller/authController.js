const authService = require('../service/authService');
const accountService = require('../service/accountService');
const request = require('request');
const crypto = require('crypto');

module.exports.getLoginPage = function (req, res) {
    res.render('login', { title: 'HSRmarket - Login', css: true });
};

module.exports.getRegisterPage = function (req, res) {
    res.render('register', { title: 'HSRmarket - Register', css: true });
};

module.exports.postLogin = function (req, res) {
    const hash = crypto.createHash('sha256').update(req.body.password).digest('hex');
    if(!req.session.username) {
        authService.authenticate(req.body.username, hash, function (error, response, data) {
            if (!error && response.statusCode === 200) {
                const username = data.email;
                const userid = data.id;
                const isAdmin = data.admin;
                req.session.username = username;
                req.session.userid = userid;
                req.session.isadmin = isAdmin;
                res.redirect('/');
            } else {
                res.render('login', { title: 'HSRmarket - Login', css: true, errortext: 'Wrong password or username' });
            }
        });
    } else {
        res.redirect('/home');
    }
};

module.exports.registerUser = function (req, res) {
    const hash = crypto.createHash('sha256').update(req.body.password).digest('hex');
    const jsonArray = {
        studentID: parseInt(req.body.studentID),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: {
            street: req.body.street,
            streetNr: req.body.streetnr,
            zip: parseInt(req.body.zip),
            city: req.body.city
        },
        email: req.body.email,
        telephone: req.body.telephone,
        password: hash
    };
    const account = JSON.stringify(jsonArray);
    accountService.add(account, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.redirect('/user/login');
        } else {
            res.render('displayError', { title: 'HSRmarket - Error', message: error });
        }
    });

};
module.exports.logout = function (req, res) {
    if(req.session.username) {
        req.session.username = null;
        res.redirect('/');
    }
};
