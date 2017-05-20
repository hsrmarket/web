var articleService = require('../service/articleService');

/* Interface Methodes */

module.exports.getRechtlichesPage = function (req, res) {
    res.render('rechtliches', { title: 'HSRmarket - Rechtliches', username: req.session.username, isadmin: req.session.isadmin });
};

module.exports.getImpressumPage = function (req, res) {
    res.render('impressum', { title: 'HSRmarket - Impressum', username: req.session.username, isadmin: req.session.isadmin });
};

module.exports.getContactPage= function (req, res) {
    res.render('kontakt', { title: 'HSRmarket - Kontakt', username: req.session.username, isadmin: req.session.isadmin });
};

module.exports.getHomePage = function (req, res) {
    res.render('home', { title: 'HSRmarket - Home', css: true });
};

module.exports.getIndexPage = function (req, res) {
    articleService.recentArticles(function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const articles = JSON.parse(body);
            res.render('index', { articles: articles, username: req.session.username, isadmin: req.session.isadmin });
        } else {
            res.render('displayError', { title: 'HSRmarket - Error', message: error });
        }
    });
};
