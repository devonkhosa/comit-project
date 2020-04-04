const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").createServer(app);
const port = 3000;
const io = require("socket.io")(http);
const pug = require("pug");
const mongo = require("mongoose");

//middleware
app.set("view engine", "pug");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/messages", (req, res) => {
  Message.find({},(err, messages) => {
    res.send(messages);
  });
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
const home = require("./routes/home");
const nodebcChat = require("./routes/nodebcChat");
const about = require("./routes/about");
app.get("/home", home);
app.get("/node", nodebcChat);
app.get("/about", about);

//Mongoose
const Message = mongo.model("Message", {
  name : String,
  message : String
});

const dbUrl = "mongodb+srv://nodebc:nodebc1@nodebc-c6sqh.mongodb.net/test?retryWrites=true&w=majority";

//Render homepage at / directory
app.get("/", (req, res) => {
  res.render("home");
});



//displays messages
io.on("connection", (io) => {
  io.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});



//socket.io -> user connection/disconnection console log
io.on("connection", (io) => {
  console.log("a user", ("connected".green));
  io.on("disconnect", (io ) => {
    console.log("a user", ("disconnected".red));
  });
}); 

mongo.connect(dbUrl, {
  useUnifiedTopology: true, useNewUrlParser: true}, (err) => {
  console.log("MongoDB"+" connected.".green)
});

http.listen(port, (err) => {
  require("colors"); //Extra; provides colour to the console.log output.
  if (err) {
    return console.log(("Error! Something went wrong.").bgRed);
  }
  console.log("Chat is online:", ("=====>".rainbow), (`http://localhost:${port}/`.underline.cyan), ("<=====".rainbow));
});