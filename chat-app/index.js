const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 3000;

app.get('/', (req, res)=>{
  res.send('<h1>Hello world</h1>');
});

server.listen(port, (err)=>{
  if (err) {
    return console.log(`Error! Something went wrong.`)
  }
  console.log(` is available on localhost: ${port}.`);
});