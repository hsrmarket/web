/**
 * Created by urs on 10.05.17.
 */

var multer = require('multer');
var fs = require('fs');

var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, '../public/articleImages');
    },
    filename: function (request, file, callback) {
        console.log(file);
        callback(null, file.originalname + Date.now().toString());
    }
});


var upload = multer({storage: storage}).array("image");

module.exports.uploadImage = function (req, res, callback) {
    upload(req,res, function (err) {
        if (req.files[0] != null) {
            if ((req.files[0].originalname != "" || req.files[0].originalname != null) && (req.files[0].originalname != req.body.oldimage) && (req.body.oldimage.toString() != "")) {
                console.log("DELETING OLD FILE");
                var fileToDelete = "../public/articleImages/" + req.body.oldimage;
                fs.unlink(fileToDelete, function (err) {
                    if (err) {
                        res.render("displayError", { title: "HSRmarket - Error", message : err});
                    }
                });
            }
        }
        callback(err, req);
    });
};

