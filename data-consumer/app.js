'use strict';

const config    = require('config');
const express   = require('express');
const app       = express();


if (config.has('sslConfig')) {
    var sslPW = config.get('sslConfig.password');
} else {
    console.log('Can\'t find configuration file!');
}


app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
