/**
 * Created by Urs Forrer on 05.05.2017.
 */

/**
 * Created by felix_2 on 03.05.2017.
 */

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = require('request');

var URL = "http://duernten.forrer.network:9000/api/purchases";

module.exports.addPurchase = function (req, res) {
    console.log("ICH BIN HIER");
    var stringDate = new Date().toISOString().substring(0,10);
    var options = {
         "article": {
             "id": parseInt(req.body.articleid)
         },
         "buyer": {
             "id": parseInt(req.session.userid)
         },
         "completed": false,
         "purchaseDate": stringDate
     };

    var jsonData = JSON.stringify(options);
    console.log(jsonData);

    var headers = {
        'Content-Type': "application/json"
    };

    var options = {
        url: URL,
        method: 'POST',
        headers: headers,
        body: jsonData
    };

    request(options, function (error, response, body) {
        console.log("Response from server for login request");
        if (!error && response.statusCode == 200) {
            res.redirect("/");
        } else {
            console.log(body);
        }
    });
};

module.exports.deletePurchase = function (req, res) {

};

/* Accounts */

