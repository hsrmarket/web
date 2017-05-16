'use strict';

var request = require('request');
var URL = "http://duernten.forrer.network:9000/api/articles";

var headers = {
    'Content-Type': "application/json"
};

module.exports.delete = function (id, callback) {
    var updateURL = URL  + id;

    var options = {
        url: updateURL,
        method: 'DELETE'
    };

    request(options, function (error, response, body) {
        callback(error, response, body);
    });
};

module.exports.add = function (data, callback) {
    var options = {
        url: URL,
        method: 'POST',
        headers: headers,
        body: data
    };

    console.log(data);

    request(options, function (error, response, body) {
        callback(error, response, body);
    });
};

module.exports.get = function (id, callback) {
    var options = {
        url: URL + "/" + id,
        method: 'GET',
        headers: headers
    };

    request(options, function (error, response, body) {
        callback(error, response, body);
    });
};

module.exports.getList = function (url, callback) {
    var options = {
        url: URL + url,
        method: 'GET',
        headers: headers
    };

    request(options, function (error, response, body) {
        callback(error, response, body);
    });
};

module.exports.saveData = function (data, callback) {
    var updateURL = URL + "/" + data.body.id;
    var fileName = "";
    if (data.files[0] != null) {
        if ((data.files[0].originalname != "" || data.files[0].originalname != null) && (data.files[0].originalname != data.body.oldimage) && (data.body.oldimage != null || data.body.oldimage != "")) {
            fileName = data.files[0].originalname;
        }
    } else {
        fileName = data.body.oldimage;
    }
    switch(data.body.type) {
        case "book":
            var options = {
                "id": parseInt(data.body.id),
                "name": data.body.name,
                "price": parseFloat(data.body.price),
                "condition": parseInt(data.body.condition),
                "description": data.body.description,
                "creationDate": data.body.creationDate,
                "image": fileName,
                "type": data.body.type,
                "isbn": data.body.isbn,
                "author": data.body.author,
                "publisher": data.body.publisher
            };
            break;
        case "electronic":
            var options = {
                "id": parseInt(data.body.id),
                "name": data.body.name,
                "price": parseFloat(data.body.price),
                "condition": parseInt(data.body.condition),
                "description": data.body.description,
                "creationDate": data.body.creationDate,
                "image": fileName,
                "type": data.body.type,
                "producer": data.body.producer,
                "model": data.body.model
            };
            break;
        default:
            var options = {
                "id": parseInt(data.body.id),
                "name": data.body.name,
                "price": parseFloat(data.body.price),
                "condition": parseInt(data.body.condition),
                "description": data.body.description,
                "creationDate": data.body.creationDate,
                "image": fileName,
                "type": data.body.type
            };
            break;

    }

    var jsonData = JSON.stringify(options);
    console.log(jsonData);

    var options = {
        url: updateURL,
        method: 'PUT',
        headers: headers,
        body: jsonData
    };

    request(options, function (error, response, body) {
        callback(error, response, body);
    });
};

module.exports.recentArticles = function (callback) {
    var options = {
        url: URL + "/recent",
        method: 'GET',
        headers: headers
    };

    request(options, function (error, response, body) {
        callback(error, response, body);
    });
};