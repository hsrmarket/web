var appService = require("../services/appService");
var Book = require("../model/book");
module.exports.showHome = function(req, res) {
    res.render('index');
};

module.exports.getArticle = function (req, res) {
    appService.getAll(function (err, data) {
       if(err){
           res.send(err);
           return;
       }
       res.render('currentCollection', { books: data});
    });
};

module.exports.createArticle = function (req, res) {
    res.render('createBook');
};

module.exports.postArticle = function (req, res) {
    const _id = req.body._id;
    const bookname = req.body.Bookname;
    const IBANnumber = req.body.IBANnumber;
    const autor = req.body.Autor;

    try{
        var book = new Book(_id, bookname, IBANnumber, autor);
        appService.add(book, function (err, data) {
            if(err){
                res.send("Store service insert error: ", err);
            } else {
                res.render("success", {Bookname: book.bookname, IBANnumber : book.IBANnumber, Autor : book.autor});
            }
        })
    } catch(err) {
        console.log("save error", err);
        res.send(err);
        return;
    }
};