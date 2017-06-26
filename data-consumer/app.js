'use strict';

const config    = require('config');
const log4js    = require('log4js');
const mysql     = require('mysql');
const express   = require('express');
const logger    = log4js.getLogger();
const app       = express();

if (!config.has('config')) {
    console.log('Can\'t find configuration file. Aborting...!');
    return;
}

logger.info('NODE_ENV: '        + config.util.getEnv('NODE_ENV'));
logger.info('NODE_CONFIG_DIR: ' + config.util.getEnv('NODE_CONFIG_DIR'));

var connection = mysql.createConnection({
    host     : config.get('config.mySQL.server'),
    user     : config.get('config.mySQL.user'),
    password : config.get('config.mySQL.password'),
    database : config.get('config.mySQL.database')
});

connection.connect(function(err) {
    if (err) {
        logger.error('Error connecting: ' + err.stack); //TODO: No stack in PROD
        return;
    }

    logger.info('Connected as id ' + connection.threadId);
});

connection.query('SELECT * FROM fund',function(err,rows){
    if(err) throw err;

    logger.info('Data received from Db:');
    logger.info(rows);
});

connection.end(function(err) {
    logger.info('Disconnected from DB!');
});


app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    logger.info('App listening on port 3000!');
});
