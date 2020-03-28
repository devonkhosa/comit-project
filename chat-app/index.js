const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 3000;

//Extra; provides colour to the console.log output.
const colors = require('colors');


app.get('/', (req, res)=>{
  res.send('<h1>Hello world</h1>');
});

server.listen(port, (err)=>{
  if (err) {
    return console.log(`Error! Something went wrong.`)
  }
  console.log('Chat is online:', ('=====>'.rainbow), (`localhost:${port}/`.underline.cyan), ('<====='.rainbow));
});