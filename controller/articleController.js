const request = require('request');
const storageService = require('../service/storageService');
const articleService = require('../service/articleService');


module.exports.getArticles = function (req, res) {
    articleService.getList(req.url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const articles = JSON.parse(body);
            const title = req.url.split('/').pop();
            res.render('showArticles', { title: title, articles: articles, username: req.session.username, isadmin: req.session.isadmin });
        } else {
            res.render('displayError', { title: 'HSRmarket - Error', message: error });
        }
    });
};

function getImageOfArticle(imageFiled) {
    if (imageFiled === '' || imageFiled == null) {
        return '/images/icon_q_dooted.png';

    } else {
        return '/articleImages/' + imageFiled;
    }
}

module.exports.getArticlesByID = function (req, res) {
    const articleURL = req.url;
    const articleID = articleURL.replace('/','');

    articleService.get(articleID, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const article = JSON.parse(body);
            const articleImage = getImageOfArticle(article.image);
            const title = 'HSRmarket - ' + article.name;
            res.render('articleView', { title: title, articles: article, articleImage: articleImage, username: req.session.username, isadmin: req.session.isadmin });
        } else {
            res.render('displayError', { title: 'HSRmarket - Error', message: error });
        }
    });
};

module.exports.editArticleByID = function (req, res) {
    const articleURL = req.url;
    const articleID = articleURL.replace('/edit', '').replace('/', '');

    articleService.get(articleID, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const article = JSON.parse(body);
            const articleImage = getImageOfArticle(article.image);
            const title = 'HSRmarket - ' + article.name;
            res.render('articleUpdate', { title: title, article: article, username: req.session.username, articleImage: articleImage, isadmin: req.session.isadmin });
        } else {
            res.render('displayError', { title: 'HSRmarket - Error', message: error });
        }
    });
};

module.exports.saveArticleToDB = function (req, res) {
    storageService.uploadImageEdit(req, res, function (err, value) {
        if (err) {
            res.render('displayError', { title: 'HSRmarket - Error', message: err });
            return;
        }
        articleService.saveData(value, function (error, response, body) {
            if (error && response.statusCode !== 200) {
                console.log('ERORR');
            } else {
                var redirect = '';
                if (req.session.isadmin) {
                    redirect = '/admin/articles';
                }
                else {
                    redirect = '/articles/' + req.body.id;
                }
                res.redirect(redirect);
            }
        });
    });
};

module.exports.deleteArticle = function (req, res) {
    const articleURL = req.url;
    const articleID = articleURL.replace('/delete', '').replace('/', '');

    articleService.delete(articleID, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.redirect('/admin/articles');
        } else {
            res.render('displayError', { title: 'HSRmarket - Error', message: error });
        }
    });
};

module.exports.getPreSelectionPage = function (req, res) {
    res.render('preSelection', { title: 'HSRmarket - Preselection Article', username: req.session.username, isadmin: req.session.isadmin });
};

module.exports.getAddPage = function (req, res) {
    const type = req.query.type;
    res.render('addArticle', { title: 'HSRmarket - Preselection Article', type: req.query.type, username: req.session.username, isadmin: req.session.isadmin });
};

module.exports.addArticle = function (req, res) {
    storageService.uploadImageAdd(req, res, function (err, data) {
        if (err) {
            res.render('displayError', { title: 'HSRmarket - Error', message: err });
            return;
        }
        var fileName = '';
        if (data.files[0] != null) {
            fileName = data.files[0].originalname;
        }
        const date = new Date().toISOString().substring(0, 10);
        switch(data.body.type) {
            case 'book':
                var obj = {
                    name: data.body.name,
                    price: parseFloat(data.body.price),
                    condition: parseInt(data.body.condition),
                    description: data.body.description,
                    creationDate: date,
                    image: fileName,
                    type: data.body.type,
                    isbn: data.body.isbn,
                    author: data.body.author,
                    publisher: data.body.publisher,
                    createdby: data.session.userid
                };
                break;
            case 'electronic':
                var obj = {
                    name: data.body.name,
                    price: parseFloat(data.body.price),
                    condition: parseInt(data.body.condition),
                    description: data.body.description,
                    creationDate: date,
                    image: fileName,
                    type: data.body.type,
                    producer: data.body.producer,
                    model: data.body.model,
                    createdby: data.session.userid
                };
                break;
            default:
                var obj = {
                    name: data.body.name,
                    price: parseFloat(data.body.price),
                    condition: parseInt(data.body.condition),
                    description: data.body.description,
                    creationDate: date,
                    image: fileName,
                    type: data.body.type,
                    createdby: data.session.userid
                };
                break;
        }

        var data = JSON.stringify(obj);

        articleService.add(data, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                res.redirect('/');
            } else {
                res.render('displayError', { title: 'HSRmarket - Error', message: error });
                console.log(response);
                console.log(body);
            }
        });
    });
};