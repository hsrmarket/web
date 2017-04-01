var appService = require("../services/appService");

module.exports.showHome = function (req, res) {
    res.render('index');
};

module.exports.getArticle = function (req, res) {
    appService.getAll(function (err, books) {
        res.render('currentCollection', { books: books });
    });
};

module.exports.createArticle = function (req, res) {
    res.render('createBook');
};

module.exports.postArticle = function (req, res) {

    var book = appService.add(req.body.id, req.body.iban, req.body.author, function (err, book) {
        res.render('success', book);
    });
};

//# sourceMappingURL=appController-compiled.js.map