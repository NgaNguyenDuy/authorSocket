'use strict';

var debug = require('debug')('chatapp'),
    app = require('./app'), server;

server = app.listen(process.env.PORT || 8008, function() {
    debug('Express was running at port ' + process.env.PORT);
});

var io = require('socket.io').listen(server, {
        origins: "*",
        transports: ["polling", "websocket"]
    });
