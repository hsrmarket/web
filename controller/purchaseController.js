var purchaseService = require("../service/purchaseService");

module.exports.addPurchase = function (req, res) {
    var date = new Date().toISOString().substring(0,10);
    var data = {
         "article": {
             "id": parseInt(req.body.articleid)
         },
         "buyer": {
             "id": parseInt(req.session.userid)
         },
         "completed": false,
         "purchaseDate": date
     };

    var purchase = JSON.stringify(data);

    purchaseService.add(purchase, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.redirect("/");
        } else {
            res.render("displayError", { title : "HSRmarket - Error", message : error});
        }
    });
};

module.exports.deletePurchase = function (req, res) {

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

