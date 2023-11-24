const express = require("express");
const path = require("path");

const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

// socket events
let users = [];
io.on("connection", async (socket) => {
  // get all users
  let userData = {};
  users.push(userData);
  io.emit("users-data", { users });

  // get message from client
  socket.io("message-to-server", () => {});

  // fetch previous messages
  socket.on("fetch-messages", () => {});

  socket.on("disconnect", () => {});
});

const app = express();

const publicDir = path.join(__dirname, "../public");

app.use(express.json());
app.use(express.static(publicDir));

server.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
