/**
 * Created by felix_2 on 28.04.2017.
 */
'use strict';
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var crypto = require('crypto');
var request = require('request');

var URL = "http://duernten.forrer.network:9000/";

function authentication(email, password, callback) {
    var hash = crypto.createHash('sha256').update(password).digest('hex');

    console.log("HEREHEREHEREHEREHEREHEREHEREHEREHEREHERE");

    var options = {
        uri: "http://duernten.forrer.network:9000/api/user/login",
        method: 'POST',
        json: {
            "email": email,
            "password": password
        }
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            callback(body);
        }
        if(response.statusCode == 301){
            res.status(301).redirect('http://google.com');
        }

    });
}

module.exports = { authenticate: authentication };