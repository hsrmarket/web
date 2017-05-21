/**
 * Created by felix_2 on 28.04.2017.
 */

const crypto = require('crypto');
const request = require('request');

function authentication(email, password, callback) {
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    const options = {
        uri: 'http://duernten.forrer.network:9000/api/user/login',
        method: 'POST',
        json: {
            email: email,
            password: password,
        }
    };

    request(options, function (error, response, body) {
        callback(error, response, body);
    });
}

module.exports = { authenticate: authentication };
