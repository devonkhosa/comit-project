const Message = require("../models/message");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const nodebcChat = (req, res) => {
    res.render("node");
};

const messageDelete = async (req, res) => {
    const idToDelete = req.params.id;
    await Message.deleteOne({ _id: idToDelete }).exec();
    res.redirect("/")
}

module.exports = messageDelete;
module.exports = nodebcChat;