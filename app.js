'use strict';

var express = require('express'),
    app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');



module.exports = app;
