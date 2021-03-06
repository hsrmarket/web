/**
 * Created by urs on 10.05.17.
 */

const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, path.join(__dirname, '../', 'public/articleImages'));
    },
    filename: function (request, file, callback) {
        console.log(file);
        callback(null, file.originalname);
    },
});


const upload = multer({ storage: storage }).array('image');

module.exports.uploadImageEdit = function (req, res, callback) {
    upload(req, res, function (err) {
        if (req.files[0] != null) {
            if ((req.files[0].originalname !== '' || req.files[0].originalname != null) && (req.files[0].originalname !== req.body.oldimage) && (req.body.oldimage.toString() !== '')) {
                console.log('DELETING OLD FILE');
                const relpath = path.join(__dirname, '../', 'public/articleImages');
                const fileToDelete = relpath + '/' + req.body.oldimage;
                fs.unlink(fileToDelete, function (err) {
                    if (err) {
                        res.render('displayError', { title: 'HSRmarket - Error', message: err });
                    }
                });
            }
        }
        callback(err, req);
    });
};

module.exports.uploadImageAdd = function (req, res, callback) {
    upload(req, res, function (err) {
        callback(err, req);
    });
};

