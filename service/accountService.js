'use strict';

var request = require('request');
var URL = "http://duernten.forrer.network:9000/api/accounts";

var headers = {
    'Content-Type': "application/json"
};

module.exports.getList = function (callback) {
    var options = {
        url: URL,
        method: 'GET',
        headers: headers
    };

    request(options, function (error, response, body) {
        callback(error, response, body);
    });
};

module.exports.get = function (accountID, callback) {
    var options = {
        url: URL + "/" + accountID,
        method: 'GET',
        headers: headers
    };

    request(options, function (error, response, body) {
        callback(error, response, body);
    });
};

module.exports.delete = function (accountID, callback) {
    var options = {
        url: URL + "/" + accountID,
        method: 'DELETE'
    };

    request(options, function (error, response, body) {
        callback(error, response, body);
    });
};

module.exports.save = function (data, callback) {
    var options = {
        url: URL + "/" + data.id,
        method: 'PUT',
        headers: headers,
        body: data
    };

    request(options, function (error, response, body) {
        callback(error, response, body);
    });
};