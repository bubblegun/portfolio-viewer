'use strict';

const config    = require('config');
const log4js    = require('log4js');
const mysql     = require('mysql');
const restify   = require('restify');

const isin      = require('./routes/isin');
const load      = require('./routes/load');

const logger    = log4js.getLogger();

logger.info('NODE_ENV: '        + config.util.getEnv('NODE_ENV'));
logger.info('NODE_CONFIG_DIR: ' + config.util.getEnv('NODE_CONFIG_DIR'));

if (!config.has('config')) {
    console.log('Can\'t find configuration file. Aborting...!');
    return;
}

//TODO: SSL
//TODO: Sequilize?
//TODO: restify-validator
//TODO: Request logging

var server = restify.createServer({
    //certificate : fs.readFileSync('path/to/server/certificate'),
    //key         : fs.readFileSync('path/to/server/key'),
    name        : 'DataBroker',
});

server.use(restify.bodyParser({ mapParams: false }));

server.pre(function(req, res, next) {
    logger.info('Incoming request from %s', req.connection.remoteAddress);
    return next();
});


server.get('/api/isin/',        isin.get);
server.get('/api/isin/:isin',   isin.get);

server.post('/api/isin/:isin',  isin.post); //TODO: Post or Put?

server.get('/api/load/:isin',   load.isin);

server.listen(3000, function() {
    logger.info('%s listening at %s', server.name, server.url);
});