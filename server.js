'use strict';

var debug = require('debug')('chatapp'),
    app = require('./app'), server,
    bodyParser = require('body-parser');


server = app.listen(process.env.PORT || 8008, function() {
    debug('Express was running at port ' + process.env.PORT);
});

var io = require('socket.io').listen(server, {
        // origins: "http://localhost:* http://google.com:* http://nodejs.vn:*",
    origins: '*:*',
    transports: ["polling", "websocket"]
    });


var socketio_jwt = require('socketio-jwt'),
    jwt = require('jsonwebtoken'),
    cert = require('fs').readFileSync('private.key');;

// Using middleware
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post('/login', function (req, res) {
    var profile = {
        username: 'nganguyenduy',
        first_name: 'NgaNguyen',
        last_name: 'Duy',
        email: 'kyo1508@gmail.com',
        id: 123
    };
    

    // We are sending the profile inside the token
    var token = jwt.sign(profile, cert);
    
    console.log(jwt.decode(token));
    
    // jwt.verify(token, cert, function(err, decoded) {
    //     console.log(decoded.username);
    // });

    // Check username and password dummy send from user.
    if(req.body.username === profile.email && req.body.password === '123456') {
        res.json({token: token});
    } else {
        res.status(400).send('Bad Request.'); 
   }
});

// Using authorize method via socketio-jwt
io.use(socketio_jwt.authorize({
    secret: cert,
    handshake: true
}));

io.sockets
    .on('connection', function (socket) {
        console.log(socket.decoded_token.email, 'connected');
        socket.on('ping', function (m) {
            socket.emit('pong', m);
        });
    });

setInterval(function () {
    io.sockets.emit('time', Date());
}, 5000);
