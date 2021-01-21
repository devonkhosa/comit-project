require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").createServer(app);
const port = process.env.PORT || 8080;
const io = require("socket.io")(http);
const pug = require("pug");
const mongoose = require("mongoose");
const dbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.RESTOF}`;

const Message = mongoose.model("Message", {
  name : String,
  message : String
});

app.set("view engine", "pug");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const home = require("./routes/home");
const nodebcChat = require("./routes/nodebcChat");
const about = require("./routes/about");
const messageDelete = require("./routes/nodebcChat");

app.get("/home", home);
app.get("/node/", nodebcChat);
app.get("/about", about);
app.get("/node/", messageDelete);

let uri = dbURL;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//Render homepage at / directory
app.get("/", (req, res) => {
  res.render("home");
});

//socket.io -> user connection/disconnection console log
io.on("connection", (io) => {
  console.log("a user", ("connected".green));
  io.on("disconnect", (io ) => {
    console.log("a user", ("disconnected".red));
  });
}); 

mongoose.connect(uri, {
  useUnifiedTopology: true, useNewUrlParser: true}, (err) => {
  console.log("MongoDB"+" connected.".green)
});

app.post("/messages", (req, res) => {
  var message = new Message(req.body);
  message.save((err) =>{
    if(err)
      sendStatus(500);
    io.emit("message", req.body);
    res.sendStatus(200);
  });
});

app.get("/messages", (req, res) => {
  Message.find({},(err, messages) => {
    res.send(messages);
  });
});

app.get("/messages", (req, res) => {
  Message.find({},(err, messages) => {
    res.send(messages);
  });
});

app.delete("/messages", ()=> {
  test.messages.deleteOne()
})

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

http.listen(port, (err) => {
  require("colors"); //Extra; provides colour to the console.log output.
  if (err) {
    return console.log(("Error! Something went wrong.").bgRed);
  }
  console.log("Chat is online:", ("=====>".rainbow), (`http://localhost:${port}/`.underline.cyan), ("<=====".rainbow));
});

module.exports = dbURL;