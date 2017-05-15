'use strict';

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = require('request');
var URL = "http://duernten.forrer.network:9000/api/articles";

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
    switch(data.type) {
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

    var headers = {
        'Content-Type': "application/json"
    };

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
