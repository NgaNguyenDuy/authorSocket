'use strict';

var express = require('express'),
    app = express();
    // session = require('express-session');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// app.use(session({
//     name: 'node-js-session',
//     resave: false, // don't save session if unmodified
//     saveUninitialized: false, // don't create session until something stored
//     secret: 'secret-key',
//     cookie: {
//         httpOnly: true
//     }
// }));

app.get('/login', function(req, res) {
    res.render('index');
});

module.exports = app;
