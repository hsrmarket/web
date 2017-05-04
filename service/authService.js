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

    var options = {
        uri: "http://duernten.forrer.network:9000/api/user/login",
        method: 'POST',
        json: {
            "email": email,
            "password": password
        }
    };

    console.log("Request Login Authentication");

    request(options, function (error, response, body) {
        console.log("Response from server for login request");
        if (!error && response.statusCode == 200) {
            console.log(body);
            callback(body);
        } else {
            console.log(body);
        }
    });
}

module.exports = { authenticate: authentication };