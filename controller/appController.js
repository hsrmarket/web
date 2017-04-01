var appService = require("../services/appService");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var URL = "http://localhost:9000/Books";

module.exports.showHome = function(req, res) {
    res.render('index');
};

/*
module.exports.getArticle = function (req, res) {
    appService.getAll(function(err, books) {
        res.render('currentCollection', {books : books});
    });
};
*/

module.exports.getArticle = function (req, res) {
    var http = new XMLHttpRequest();
    var url = URL;
    var methode = "GET";

    http.open(methode, url, true);
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            var books = JSON.parse(http.responseText);
            res.render('currentCollection', {books : books});
        }
    };

    http.send();
};

module.exports.createArticle = function (req, res) {
    res.render('createBook');
};

/*
module.exports.postArticle = function (req, res) {

    var book = appService.add(req.body.id, req.body.iban, req.body.author, function(err, book) {
        res.render('success', book);
    });

};
*/

module.exports.postArticle = function (req, res){

    var http = new XMLHttpRequest();
    var url = URL;
    var methode = "POST";

    http.open(methode, url, true);
    http.setRequestHeader("Content-type", "application/json;charset=UTF-8");

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            console.log(http.responseText);

        }

        console.log(http.responseText);
    };
    console.log(JSON.stringify({ id: 343, iban: "5558 34834 3453 34534", author: "J. K. Rolling" }));
    http.send(JSON.stringify({ id: 343, iban: "5558 34834 3453 34534", author: "J. K. Rolling" }));
};


/*
module.exports.postArticle = function(req, res){

    $.ajax({
        type: "POST",
        url: "http://localhost:9000/Books",
        data: { id: "106", iban: "5558 34834 3453 34534", author: "J. K. Rolling" },
        success: function(result){
            switch (result){
                case true:
                    res.render('success', result)
            }
        },
        dataType: "json"
    });

};
*/