const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').createServer(app);
const port = 3000;
const io = require('socket.io');
const socket = io(http);
const pug = require('pug');

//middleware
app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/', (req, res)=> {
  res.render('home');
})

//modules
const generalChat = require('./routes/generalChat');
const home = require('./routes/home');
const nodebcChat = require('./routes/nodebcChat');
const randomChat = require('./routes/randomChat');
const about = require('./routes/about');

app.get('/general', generalChat);
app.get('/home', home);
app.get('/node', nodebcChat);
app.get('/random', randomChat);
app.get('/about', about);

//socket.io -> user connection console log
socket.on('connection', (socket)=>{
  console.log('a user', ('connected'.green));
  socket.on('disconnect', (socket)=>{
    console.log('a user', ('disconnected'.red));
  });
}); 
//socket.io -> message console log
socket.on('connection', (socket)=>{
  socket.on('chat message', (msg)=>{
    console.log(('Message: '.blue) + msg.grey);
  })
})
//displays messages
socket.on('connection', (socket)=>{
  socket.on('chat message', (msg)=>{
    socket.emit('chat message', msg);
  });
});

http.listen(port, (err)=>{
  require('colors'); //Extra; provides colour to the console.log output.
  if (err) {
    return console.log(('Error! Something went wrong.').bgRed);
  }
  console.log('Chat is online:', ('=====>'.rainbow), (`http://localhost:${port}/`.underline.cyan), ('<====='.rainbow));
});