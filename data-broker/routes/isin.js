'use strict';

const log4js    = require('log4js');
const db        = require('../db.js').db;

const logger    = log4js.getLogger();

// db.query('SELECT * FROM fund',function(err,rows){
//     if(err) throw err;

//     logger.info(rows);
// });

exports.get = function(req, res, next) {

    res.send('hello: ' + req.params.isin);
    return next();
};

exports.post = function(req, res, next) {
    logger.info('POST ROUTE');

    //logger.info(req.body);

    res.send('success for: ' + req.params.isin);
    return next();
};