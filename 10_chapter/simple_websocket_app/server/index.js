const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3000 });

wss.on("connection", (ws) => {
  ws.send("connected");

  ws.on("message", (msgFromClient) => {
    const message = JSON.parse(msgFromClient);
    console.log(message);
  });
});
