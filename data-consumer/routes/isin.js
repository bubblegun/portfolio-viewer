
const log4js    = require('log4js');
const db        = require('../db.js').db;

const logger    = log4js.getLogger();

exports.get = function(req, res, next) {

    db.query('SELECT * FROM fund',function(err,rows){
        if(err) throw err;

        logger.info(rows);
    });

    res.send('hello: ' + req.params.isin);
    return next();
};