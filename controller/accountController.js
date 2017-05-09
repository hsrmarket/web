/**
 * Created by felix_2 on 03.05.2017.
 */

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = require('request');

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
    var accountURL = req.url;
    var accountID =  accountURL.replace('/edit','');
    var url = URL + accountID;
    var methode = "GET";

    http.open(methode, url, true);
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status === 200) {
            var data = JSON.parse(http.responseText);
            res.render('editAccount', { data : data, username : req.session.username, isadmin : req.session.isadmin, pageTitle: "Account"});
        }
    };
    http.send();
};

module.exports.saveAccountToDB = function (req, res) {

    var updateURL = URL + "/" + req.body.id;
    var password = req.body.password;
    var account = {
        "id": parseInt(req.body.id),
        "studentId": parseInt(req.body.studentId),
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "address": {
            "id": parseInt(req.body.address_id),
            "street": req.body.street,
            "streetNr": req.body.streetNr,
            "zip": parseInt(req.body.zip),
            "city": req.body.city
        },
        "email": req.body.email,
        "telephone": req.body.telephone,
        "password": password,
        "admin": req.session.isadmin
    };

    var jsonData = JSON.stringify(account);

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
        if (!error && response.statusCode == 200) {
            var redirect = "";
            if (req.session.isadmin) {
                redirect = "/admin/accounts";
            }
            else {
                redirect = "/user";
            }
            res.redirect(redirect);
        } else {
            console.log(response);
            console.log(body);
        }
    });
};

module.exports.deleteAccount = function (req, res) {
    var accountURL = req.url;
    var accountID =  accountURL.replace('/delete','');
    var updateURL = URL  + accountID;

    var options = {
        url: updateURL,
        method: 'DELETE'
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.redirect("/admin/accounts");
        } else {
            console.log(body);
        }
    });
};