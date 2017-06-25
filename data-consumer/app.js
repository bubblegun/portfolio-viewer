'use strict';

const config    = require('config');
const mysql     = require('mysql');
const express   = require('express');
const app       = express();

var connection = mysql.createConnection({
  host     : config.get('config.mySQL.server'),
  user     : config.get('config.mySQL.user'),
  password : config.get('config.mySQL.password'),
  database : config.get('config.mySQL.database')
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

connection.query('SELECT * FROM fund',function(err,rows){
  if(err) throw err;

  console.log('Data received from Db:\n');
  console.log(rows);
});

if (config.has('config')) {
    var sslPW = config.get('config.sslConfig.password');
} else {
    console.log('Can\'t find configuration file!');
}

console.log('NODE_ENV: '        + config.util.getEnv('NODE_ENV'));
console.log('NODE_CONFIG_DIR: ' + config.util.getEnv('NODE_CONFIG_DIR'));


app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
