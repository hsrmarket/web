var articleService = require("../service/articleService");
var accountService = require("../service/accountService");

module.exports.getOverviewPage = function (req, res) {
    res.render('adminpanel', {title : "HSRmarket - Admin Panel", username : req.session.username, isadmin : req.session.isadmin});
};

module.exports.getManageAccounts = function (req, res) {
    accountService.getList(function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var accounts = JSON.parse(body);
            res.render('accountsList', {title : "Manage Accounts", accounts : accounts, username : req.session.username, isadmin : req.session.isadmin});
        } else {
            res.render("displayError", { title : "HSRmarket - Error", message : error});
        }
    });
};

module.exports.getManageArticles = function (req, res) {
    articleService.getList("", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var articles = JSON.parse(body);
            res.render('articlesList', {title : "HSRmarket - Manage Articles", articles : articles, username : req.session.username, isadmin : req.session.isadmin});
        } else {
            res.render("displayError", { title : "HSRmarket - Error", message : error});
        }
    });
};