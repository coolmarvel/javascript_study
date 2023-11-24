const express = require("express");
const path = require("path");

const app = express();

const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

const mongoose = require("mongoose");
require("dotenv").config();

const { saveMessages } = require("./utils/messages.utils");

const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;

mongoose.set("strictQuery", false);
mongoose
  .connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@test.vi6echp.mongodb.net/`)
  .then(() => console.log("MongoDB Connect Success!"))
  .catch((err) => console.log(err));

let users = [];
io.on("connection", async (socket) => {
  let userData = { username: socket.username, userID: socket.id };
  users.push(userData);
  io.emit("users-data", { users });

  // 클라이언트에서 보내온 메시지 A -> Server -> B
  socket.io("message-to-server", (payload) => {
    io.to(payload.to).emit("message-to-client", payload);
    saveMessages(payload);
  });

  // 데이터베이스에서 메시지 가져오기
  socket.on("fetch-messages", ({ receiver }) => {
    // fetchMessages(io, socket.id, receiver);
  });

  // 유저가 방에서 나갔을 때
  socket.on("disconnect", () => {
    users = users.filter((user) => user.userID !== socket.id);
    // 사이드바 리스트에서 없애기
    io.emit("users-data", { users });
    // 대화 중이라면 대화창 없애기
    io.emit("user-away", socket.id);
  });
});

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  const userID = socket.handshake.auth.userID;

  if (!username) return next(new Error("Invalid username"));
});

const publicDir = path.join(__dirname, "../public");

app.use(express.json());
app.use(express.static(publicDir));

app.post("/session", (req, res) => {
  const { username } = req.body;
  let data = { username, userID: randomId() };

  res.send(data);
});

const randomId = () => {
  crypto.randomBytes(8).toString("hex");
};

server.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
