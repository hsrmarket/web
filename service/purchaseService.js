'use strict';

var request = require('request');
var URL = "http://duernten.forrer.network:9000/api/purchases";

var headers = {
    'Content-Type': "application/json"
};

module.exports.add = function (data, callback) {
    var options = {
        url: URL,
        method: 'POST',
        headers: headers,
        body: data
    };

    request(options, function (error, response, body) {
        callback(error, response, body);
    });
};

module.exports.delete = function (purchaseID, callback) {
    var options = {
        url: URL + "/" + purchaseID,
        method: 'DELETE'
    };

    request(options, function (error, response, body) {
        callback(error, response, body);
    });
};

module.exports.patch = function (userID, callback) {
    let options = {
        url: URL + "/userID",
        method: 'PATCH'
    };

    request(options, function (error, response, body) {
        console.log(error);
        console.log(body);
        callback(error, response, body);
    });
};