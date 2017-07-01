const config    = require('config');
const log4js    = require('log4js');
const mysql     = require('mysql');

const logger    = log4js.getLogger();

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

// db.end(function(err) {
//     logger.info('Disconnected from DB!');
// });

exports.db = connection;