var Datastore = require('nedb');
var db = new Datastore({ filename: '../data/list.db', autoload: true });

function Book(id, iban, author) {
    this.id = id;
    this.iban = iban;
    this.author = author;
}

function insertArticle(id, iban, author, callback) {
    var book = new Book(id, iban, author);
    db.insert(book, function (err, newDoc) {
        if (callback) {
            callback(err, newDoc);
        }
    });
}

function getAllArticle(callback) {
    db.find({}).exec(function (err, docs) {
        callback(err, docs);
    });
}

module.exports = {
    add: insertArticle,
    getAll: getAllArticle
};

//# sourceMappingURL=appService-compiled.js.map