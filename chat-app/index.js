const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 3000;

//Extra; provides colour to the console.log output.
const colors = require('colors');

// __dirname allows you to get the pwd
app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/index.html');
});

server.listen(port, (err)=>{
  if (err) {
    return console.log(`Error! Something went wrong.`)
  }
  console.log('Chat is online:', ('=====>'.rainbow), (`http://localhost:${port}/`.underline.cyan), ('<====='.rainbow));
});