/**
 * Created by felix_2 on 03.05.2017.
 */

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var URL = "http://duernten.forrer.network:9000/api/accounts";

/* Accounts */

module.exports.registerNewUser = function (req, res) {

    var options = {
        uri: URL,
        method: 'POST',
        json: {
            "email": email,
            "password": password
        }
    };

    request(options, function (error, response, body) {
        console.log("Response from server for login request");
        if (!error && response.statusCode == 200) {
            console.log(body);
            callback(body);
        } else {
            console.log(body);
        }
    });
};

module.exports.getAccountDetailsByID = function (req, res) {
    var http = new XMLHttpRequest();
    var url = URL + req.url;
    var methode = "GET";

    http.open(methode, url, true);
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status === 200) {
            var data = JSON.parse(http.responseText);
            res.render('account', { data : data, username : req.session.username, pageTitle: "Account"});
        }
    };
    http.send();
};