"use strict"

const request = require('request');
const crypto = require('crypto');
const accountService = require('../service/accountService');

/* Accounts */

module.exports.getAccountDetailsByID = function (req, res) {
    const accountURL = req.url;
    const accountID = accountURL.replace('/edit', '').replace('/', '');

    accountService.get(accountID, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let data = JSON.parse(body);
            res.render('editAccount', { data: data, username: req.session.username, isadmin: req.session.isadmin, pageTitle: 'Account' });
        } else {
            res.render('displayError', { title: 'HSRmarket - Error', message: error });
        }
    });
};

module.exports.saveAccountToDB = function (req, res) {
    let hash = req.body.password;
    if (req.body.oldpassword !== req.body.password) {
        /* Hash neu berechnen */
        hash = crypto.createHash('sha256').update(req.body.password).digest('hex');
    }

    const account = {
        id: parseInt(req.body.id),
        studentId: parseInt(req.body.studentId),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: {
            id: parseInt(req.body.address_id),
            street: req.body.street,
            streetNr: req.body.streetNr,
            zip: parseInt(req.body.zip),
            city: req.body.city,
        },
        email: req.body.email,
        telephone: req.body.telephone,
        password: hash,
        admin: req.session.isadmin,
    };

    const data = JSON.stringify(account);

    accountService.save(data, req.body.id, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let redirect = '';
            if (req.session.isadmin) {
                redirect = '/admin/accounts';
            }  else {
                redirect = '/user';
            }
            res.redirect(redirect);
        } else {
            res.render('displayError', { title: 'HSRmarket - Error', message: error });
        }
    });
};

module.exports.deleteAccount = function (req, res) {
    var accountURL = req.url;
    const accountID = accountURL.replace('/delete', '').replace('/', '');

    accountService.delete(accountID, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.redirect('/admin/accounts');
        } else {
            res.render('displayError', { title: 'HSRmarket - Error', message: error });
        }
    });
};
