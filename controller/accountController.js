/**
 * Created by felix_2 on 03.05.2017.
 */

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var URL = "http://duernten.forrer.network:9000/api/accounts";

/* Accounts */

module.exports.getAccountDetailsByID = function (req, res) {
    var http = new XMLHttpRequest();
    var url = URL + req.url;
    var methode = "GET";

    http.open(methode, url, true);
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status === 200) {
            var data = JSON.parse(http.responseText);

            var username = req.session.username;
            var userid = req.session.userid;

            res.render('MyAccount', { data : data, username : username, userid : userid});
        }
    };
    http.send();
};