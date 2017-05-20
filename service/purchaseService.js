const request = require('request');
const URL = 'http://duernten.forrer.network:9000/api/purchases';

var headers = {
    'Content-Type': 'application/json',
};

module.exports.add = function (data, callback) {
    const options = {
        url: URL,
        method: 'POST',
        headers: headers,
        body: data,
    };

    request(options, function (error, response, body) {
        callback(error, response, body);
    });
};

module.exports.delete = function (purchaseID, callback) {
    const options = {
        url: URL + '/' + purchaseID,
        method: 'DELETE',
    };

    request(options, function (error, response, body) {
        callback(error, response, body);
    });
};

module.exports.getReceiptInforamtion = function (purchaseID, callback) {

    const options = {
        url: URL + '/' + purchaseID,
        method: 'GET',
    };

    request(options, function (error, response, body) {
        callback(error, response, body);
    });
};
