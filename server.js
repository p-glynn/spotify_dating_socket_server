const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.Server(app);
const websocket = socketio(server);
const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`listening on *:${port}`));


// the event that is called when a client is connected;
websocket.on('connection', (socket) => {
  console.log(`someone joined on ${socket.id}`);
  socket.on('userJoined', (userId) => onUserJoined(userId, socket));
  socket.on('message', (message) => onMessageReceived(message, socket));
});
