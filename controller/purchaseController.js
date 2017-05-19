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

module.exports.getReceipt = function (req, res) {
    var purchaseURL = req.url;
    var purchaseId =  purchaseURL.replace('/receipt','').replace('/', '');

    purchaseService.getReceiptInforamtion(purchaseId, function (error, response, body) {
        if(!error && response.statusCode == 200) {
            var x =JSON.parse(JSON.stringify(body));
            console.log("this is the byuer: "+ x[1].article);
            console.log("THIS IS THE BUYER " + body.buyer[id]);
            res.render('receipt', {info : body });
        } else {
            res.render("displayError", { title : "HSRmarket - Error", message : error});
        }
    });
};