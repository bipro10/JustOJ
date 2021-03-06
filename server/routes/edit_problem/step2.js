'use strict';

/**
 * Module dependencies.
 */
var Problems = require('../../models/problems');
var Busboy = require('busboy');
var uuid = require('uuid');
var fs = require('fs');
var path = require('path');
var async = require('async');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var logger = require('winston');

module.exports = function(req,res,next){
  var module = {};

  module.get = function(){

    async.waterfall([
      function(callback) {
        Problems.findById(req.params.pid,['id'],function(err,row){
          if( err )
            return callback(err);

          if( row.length === 0 ) return callback('404 no problem found');

          callback();
        });
      },
      function(callback){
        var rootDir = path.normalize(process.cwd() + '/files/tc/p/' + req.params.pid);
        fs.readdir(rootDir, function(err, files) {

          if( err ){
            if( err.code === 'ENOENT' )
              return callback(null,[]);   //no test cases added yet!

            return callback(err);
          }

          if(files)
            return callback(null,files);

          callback(null,[]);
        });
      }
    ], function (error, row) {

      if( error ) {
        logger.error(error);
        return next(error);
      }

      res.render('problem/edit/step_2', {
        active_nav: 'problems',
        title: 'editproblem | JUST Online Judge',
        locals: req.app.locals,
        isLoggedIn: req.isAuthenticated(),
        user: req.user,
        pid: req.params.pid,
        successMsg: req.flash('tcUpSuccess'),
        errMsg: req.flash('tcUpErr'),
        rsuccessMsg:  req.flash('tcRemSuccess'),
        rerrMsg:  req.flash('tcRemErr'),
        noTestCase: req.flash('noTestCase'),
        data: row
      });
    });
  }; //end module.get

  module.post = function(){

    var uniquename = uuid.v4();
    var saveTo = path.normalize(process.cwd() + '/files/tc/p/' + req.params.pid + '/' + uniquename);
    var namemap = [saveTo + '/i.txt', saveTo + '/o.txt'];

    async.waterfall([
      function(callback) {
        Problems.findById(req.params.pid,['id'],function(err,row){
          if( err )
            return callback(err);

          if( row.length == 0 )
            return callback('404 no problem found');

          callback();
        });
      },
      function(callback) {
        mkdirp(saveTo, function (err) {

          if (err)
            return callback(err);

          logger.info(namemap[0] + ' test case dir created! for problem id: ' + req.params.pid);

          callback();
        });
      }
    ], function (error) {

      if(error) {
        logger.error(error);
        return next(error);
      }

      var busboy = new Busboy({ headers: req.headers });
      var noFile = 0;
      var fname = 0;

      busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

        if( noFile || !filename ){
          noFile = 1;
          file.resume();
          return;
        }

        file.pipe(fs.createWriteStream(namemap[fname++]));
      });

      busboy.on('finish', function() {

        if( noFile || fname!==2 ) //clear our created input output files
          return clearUpload( saveTo , req, res );

        req.flash('tcUpSuccess', 'Test Case added!');
        res.redirect('/problems/edit/' + req.params.pid + '/2');
      });
      req.pipe(busboy);
    });
  };

  return module;
};


/**
 *
 * @param remDir
 * @param req
 * @param res
 */
var clearUpload = function(remDir,req,res){

  rimraf(remDir, function(error){
    if( error )
      logger.error(error);
    else
            logger.debug('Cleaned uploaded TC');

    req.flash('tcUpErr', 'Please Select File');
    res.redirect('/problems/edit/' + req.params.pid + '/2');
  });
};