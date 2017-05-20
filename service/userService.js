const request = require('request');
const URL = 'http://duernten.forrer.network:9000/api/user';

const headers = {
    'Content-Type': 'application/json',
};

module.exports.getArticles = function (userid, callback) {
    const options = {
        url: URL + '/' + userid + '/articles',
        method: 'GET',
        headers: headers,
    };

    request(options, function (error, response, body) {
        callback(error, response, body);
    });
};

module.exports.getPurchases = function (userid, callback) {
    const options = {
        url: URL + '/' + userid + '/purchases',
        method: 'GET',
        headers: headers,
    };

    request(options, function (error, response, body) {
        callback(error, response, body);
    });
};

module.exports.getSales = function (userid, callback) {
    const options = {
        url: URL + '/' + userid + '/sales',
        method: 'GET',
        headers: headers,
    };

    request(options, function (error, response, body) {
        callback(error, response, body);
    });
};
