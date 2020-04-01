const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').createServer(app);
const port = 3000;
const io = require('socket.io')(http);
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
const home = require('./routes/home');
const nodebcChat = require('./routes/nodebcChat');
const about = require('./routes/about');

app.get('/home', home);
app.get('/node', nodebcChat);
app.get('/about', about);

//io.io -> user connection console log
io.on('connection', (io)=>{
  console.log('a user', ('connected'.green));
  io.on('disconnect', (io)=>{
    console.log('a user', ('disconnected'.red));
  });
}); 
//socket.io -> message console log
io.on('connection', (io)=>{
  io.on('chat message', (msg)=>{
    console.log(('Message: '.blue) + msg.grey);
  })
})
//displays messages
io.on('connection', (io)=>{
  io.on('chat message', (msg)=>{
    io.emit('chat message', msg);
  });
});

http.listen(port, (err)=>{
  require('colors'); //Extra; provides colour to the console.log output.
  if (err) {
    return console.log(('Error! Something went wrong.').bgRed);
  }
  console.log('Chat is online:', ('=====>'.rainbow), (`http://localhost:${port}/`.underline.cyan), ('<====='.rainbow));
});