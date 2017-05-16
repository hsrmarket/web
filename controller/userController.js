var accountService = require("../service/accountService");
var userService = require("../service/userService");

/* User (My Account)*/
/* Only Views, saving and other functionallity is handled over the other controllers */

module.exports.getMyAccount = function (req, res) {
    accountService.get(req.session.userid, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render('editUser', { data : data, username : req.session.username, userid : req.session.userid, pageTitle: "My Account", isadmin : req.session.isadmin});
        } else {
            res.render("displayError", { title : "HSRmarket - Error", message : error});
        }
    });
};

module.exports.getMyArticle = function (req, res) {
    userService.getArticles(req.session.userid, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var articles = JSON.parse(body);
            res.render('myArticles', { articles : articles, username : req.session.username, isadmin : req.session.isadmin});
        } else {
            res.render("displayError", { title : "HSRmarket - Error", message : error});
        }
    });
};

module.exports.getMyPurchases = function (req, res) {
    userService.getPurchases(req.session.userid, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var articles = JSON.parse(body);
            res.render('myPurchases', { articles : articles, username : req.session.username, isadmin : req.session.isadmin});
        } else {
            res.render("displayError", { title : "HSRmarket - Error", message : error});
        }
    });
};

module.exports.getMySales = function (req, res) {
    userService.getSales(req.session.userid, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var sales = JSON.parse(body);
            res.render('mySales', { sales : sales, username : req.session.username, isadmin : req.session.isadmin});
        } else {
            res.render("displayError", { title : "HSRmarket - Error", message : error});
        }
    });
};


module.exports.getPreSelection = function (req, res) {
    res.render("preSelection");
};

module.exports.getAddArticle = function (req, res) {
    let type = req.query.type;
    res.render("addArticle", {article : {type : type} });
};

module.exports.postAddArticle = function (req, res) {
    console.log(req.body);

    var options = {
        uri: BaseURL + "articles",
        method: 'POST',
        json: {
            "id": req.session.userid,
            "type": req.body.type,
            "price": req.body.price,
            "name": req.body.name,
            "condition": req.body.condition,
            "description": req.body.description,
            "isbn": req.body.isbn,
            "publisher": req.body.publisher,
            "author": req.body.author,
            "image": req.body.image
        }
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Added article successfully");
            console.log(body);
            res.render("success");
        } else {
            console.log("Error while adding a new article");
            console.log(error);
        }
    });
};
