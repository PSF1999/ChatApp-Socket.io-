const express = require('express');
const socket = require('socket.io');
const morgan = require('morgan');

//App setup
const port =  4000;
const app = express();
const server = app.listen(port,() => {
  console.log(`Listening on port ${port}`);
});
//http request logger middleware
app.use(morgan('dev'));

// static middleware
app.use(express.static('public'));

//Socket setup
const io = socket(server);  //work on server

io.on('connection',(socket) => {
  console.log('Made socket connection',socket.id);  //display unique socket id

//Handle chat events

  socket.on('chat',(data) => {
    io.sockets.emit('chat',data)
  });

  socket.on('typing',(data) => {
    socket.broadcast.emit('typing',data);
  });
});
