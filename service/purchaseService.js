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

module.exports.patch = function (purchaseID, callback) {
    const change = {
        "completed" : true
    };
    const options = {
        url: URL + "/" + purchaseID,
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(change)
      
     };
    request(options, function (error, response, body) {
        callback(error, response, body);
    });
};

module.exports.getReceiptInforamtion = function (purchaseID, callback) {

    var options = {
        url: URL + "/" + purchaseID,
        method: 'GET'
    };

    request(options, function (error, response, body) {
        callback(error, response, body);
    });
};