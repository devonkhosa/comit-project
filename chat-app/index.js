const express = require('express');
const app = express();
const http = require('http').createServer(app);
const port = 3000;
const io = require('socket.io')(http);

//Extra; provides colour to the console.log output.
const colors = require('colors');

// __dirname allows you to get the pwd
app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/index.html');
});

//socket.io -> user connection console log
io.on('connection', (socket)=>{
  console.log('a user', ('connected'.green));
  socket.on('disconnect', (socket)=>{
    console.log('a user', ('disconnected'.red));
  });
}); 

//socket.io -> message console log
io.on('connection', (socket)=>{
  socket.on('chat message', (msg)=>{
    console.log(('Message: '.blue) + msg.grey);
  })
})

http.listen(port, (err)=>{
  if (err) {
    return console.log(`Error! Something went wrong.`.bgRed)
  }
  console.log('Chat is online:', ('=====>'.rainbow), (`http://localhost:${port}/`.underline.cyan), ('<====='.rainbow));
});