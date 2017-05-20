const request = require('request');

const URL = 'http://rest.hsrmarket.ch:9000/api/search';

module.exports.searchByKey = function (req, res) {
    const searchKey = req.query.search;
    if (searchKey == null || searchKey === '') {
        // Redirect if no parameter is send
        res.redirect('/');
    }
    const options = {
        uri: URL,
        method: 'POST',
        json: {
            search: searchKey,
        },
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.render('showArticles', { search: true, articles: body, username: req.session.username, isadmin: req.session.isadmin });
        } else {
            res.render('displayError', { title: 'HSRmarket - Error', message: error });
        }
    });
};