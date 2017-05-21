const request = require('request');
const URL = 'http://duernten.forrer.network:9000/api/accounts';

const headers = {
    'Content-Type': 'application/json',
};

module.exports.getList = function (callback) {
    const options = {
        url: URL,
        method: 'GET',
        headers: headers,
    };

    request(options, function (error, response, body) {
        callback(error, response, body);
    });
};

module.exports.get = function (accountID, callback) {
    const options = {
        url: URL + '/' + accountID,
        method: 'GET',
        headers: headers,
    };

    request(options, function (error, response, body) {
        callback(error, response, body);
    });
};

module.exports.delete = function (accountID, callback) {
    const options = {
        url: URL + '/' + accountID,
        method: 'DELETE',
    };

    request(options, function (error, response, body) {
        callback(error, response, body);
    });
};

module.exports.save = function (data, callback) {
    const options = {
        url: URL + '/' + data.id,
        method: 'PUT',
        headers: headers,
        body: data,
    };

    request(options, function (error, response, body) {
        callback(error, response, body);
    });
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
