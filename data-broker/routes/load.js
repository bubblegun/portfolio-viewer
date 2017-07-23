'use strict';

const log4js    = require('log4js');
const db        = require('../db.js').db;

const logger    = log4js.getLogger();


exports.isin = function(req, res, next) {
    logger.info('Load requested for %s', req.params.isin);
    res.send();
    return next();
};