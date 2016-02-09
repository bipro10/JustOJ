var express     = require('express');
var router      = express.Router();
var cloudinary  = require('cloudinary');
var Busboy      = require('busboy');
var fs          = require('fs');
var fse         = require('fs-extra')
var uuid        = require('node-uuid');
var mime        = require('mime-types');
var path        = require("path");
var jsdiff      = require('diff');
var Compiler    = require('../helpers/compiler/compiler');
var exec        = require('child_process').exec;

cloudinary.config({
    cloud_name: 'justojtest',
    api_key: '779219719618256',
    api_secret: 'h5YiiTq45IeVjRxUP3yHN_fpGDM'
});

/* GET resister page. */
router.get('/' , function(req, res, next) {



    console.log('starting');

    exec('cd /home/ahmed-dinar/exec-test && ./oh',{env: process.env}, function(err, stdout, stderr) {
        console.log('err : ');
        console.log(err);
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);


        res.render('s3', {
            title: "ADDProblems | JUST Online Judge",
            locals: req.app.locals,
            isLoggedIn: req.isAuthenticated(),
            user: req.user,
            imgURL: null
        });

    });


    console.log('end');






});



router.post('/ajaxtest/', function(req, res, next) {

    var busboy = new Busboy({ headers: req.headers });

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
        file.on('data', function(data) {
            console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        });
        file.on('end', function() {
            console.log('File [' + fieldname + '] Finished');
        });
    });

    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        console.log('Field [' + fieldname + ']: value: ' + val);
    });

    busboy.on('finish', function() {
        console.log('Done parsing form!');
        res.end('recievd!!!!');
    });

    req.pipe(busboy);
});


router.post('/:pid/', function(req, res, next) {

    var busboy = new Busboy({ headers: req.headers });
    var uniquename =  uuid.v4();
    var namemap = ['i','o'];
    var fname = 0;

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {


        var saveTo =  __dirname + '/../files/tc/p/' + req.params.pid +  '/' + uniquename + '/' + namemap[fname++] + '.' + mime.extension(mimetype);


        file.on('data', function(data) {

        });
        file.on('end', function() {

        });


        file.pipe(fse.createOutputStream(path.normalize(saveTo)));

      //  file.pipe(fs.createWriteStream(saveTo));

    });

    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        console.log('Field [' + fieldname + ']: value: ' + val);
    });

    busboy.on('finish', function() {
        console.log('upload complete!');
        res.redirect('/s3');
    });

    req.pipe(busboy);

});




module.exports = router;
