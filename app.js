const express = require('express');
const sockjs  = require('sockjs');
const http    = require('http');

const clients = [];

function broadcast(data) {
    clients.forEach(client => {
        client.write(data);
    })
}

// 1. Echo sockjs server
const sockjs_opts = {sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"};

const sockjs_echo = sockjs.createServer(sockjs_opts);
sockjs_echo.on('connection', function(conn) {
    clients.push(conn);
    console.log('connection details', conn);
    conn.on('data', function(message) {

        console.log('message', message)
       // conn.write( message);
        broadcast(message);
    });
});

// 2. Express server
const app = express(); /* express.createServer will not work here */
const server = http.createServer(app);

const locationSocket = '/locationSocket';

sockjs_echo.installHandlers(server, {prefix:locationSocket});

console.log(' [*] Listening on 0.0.0.0:9999' );
server.listen(9999, '0.0.0.0');

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/client/dist/index.html');
});

app.get('/get-socket-url', (req, res) => {
    res.send(locationSocket)

})

// app.get('/clent/',  (req, res) => {
//     res.sendFile(__dirname + '/client/index.html');
// });
//
//
//
  app.use('/client/', express.static('client/dist'))
