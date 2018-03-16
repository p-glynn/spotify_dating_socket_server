const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const connection = [];
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`listening on ${port}`));

io.sockets.on('connection', socket => {
  socket.on('joinTable1', (mytable) => { // think we can make this dynamic
    // console.log(mytable);
    socket.join(mytable);
  });
  connection.push(socket);
  console.log('socket connected', connection.length, socket.id);
  socket.on('from client side', (data) => {
    console.log(socket.rooms.table1);
    console.log(data);
    // io.sockets.emit('from server', data)
    io.in(socket.rooms.table1).emit('from server', data);
  });
  socket.on('sendMessage', (msg) => {
    console.log(msg);
    io.in(socket.rooms.table1).emit('server message response', msg);
  });
});
