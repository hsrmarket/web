/**
 * Created by felix_2 on 09.05.2017.
 */

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var URL = "http://duernten.forrer.network:9000/api/search";

/* Accounts */

module.exports.searchByKey = function (req, res) {
    let searchKey = req.body.search;
    var options = {
        uri: URL,
        method: 'POST',
        json: {
            "search": searchKey,
        }
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            response.render("articleList", { search: true , articles : body});
        } else {
            console.log(body);
        }
    });
};