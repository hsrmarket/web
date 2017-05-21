const purchaseService = require('../service/purchaseService');

module.exports.addPurchase = function (req, res) {
    const date = new Date().toISOString().substring(0, 10);
    const data = {
         article: {
             id: parseInt(req.body.articleid)
         },
         buyer: {
             id: parseInt(req.session.userid)
         },
         completed: false,
         purchaseDate: date
     };

    const purchase = JSON.stringify(data);

    purchaseService.add(purchase, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.redirect('/');
        } else {
            res.render('displayError', { title: 'HSRmarket - Error', message: error });
        }
    });
};

module.exports.patchStatus = function (req, res) {
    var purchaseID = req.url.substring(req.url.lastIndexOf('/') + 1);

    purchaseService.patch(purchaseID, function (error, response, body) {
        if(!error && response.statusCode == 200) {
            res.redirect("/user/purchases");
        } else {
            res.render("displayError", { title : "HSRmarket - Error", message : error});
        }
    })
};

module.exports.getReceipt = function (req, res) {
    const purchaseURL = req.url;
    const purchaseId = purchaseURL.replace('/receipt', '').replace('/', '');

    purchaseService.getReceiptInforamtion(purchaseId, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            console.log(data.article);
            res.render('receipt', { data: data, title: 'HSRmarket - Receipt', username: req.session.username, isadmin: req.session.isadmin });
        } else {
            res.render('displayError', { title: 'HSRmarket - Error', message: error });
        }
    });
};
