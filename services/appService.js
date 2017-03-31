var Datastore = require('nedb');
var db = new Datastore({filename: "./data/list.db", autoload: true});

function insertArticle(ArticleObj, callback) {
    db.insert(ArticleObj, callback);
}

function getAllArticle(callback) {
    db.find({}, callback);
}

module.exports = {
    add: insertArticle,
    getAll: getAllArticle
};