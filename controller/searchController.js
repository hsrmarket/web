/**
 * Created by felix_2 on 09.05.2017.
 */

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = require('request');

var URL = "http://rest.hsrmarket.ch:9000/api/search";

/* Accounts */

module.exports.searchByKey = function (req, res) {
    var searchKey = req.query.search;
    if (searchKey == null || searchKey == "") {
        // Redirect if no parameter is send
        res.redirect("/");
    }
    var options = {
        uri: URL,
        method: 'POST',
        json: {
            "search": searchKey,
        }
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.render("showArticles", { search: true , articles : body, username : req.session.username, isadmin : req.session.isadmin});
        } else {
            console.log(body);
        }
    });
};