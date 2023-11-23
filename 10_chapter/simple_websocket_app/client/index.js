const ws = new WebSocket("ws://localhost:3000/ws");

ws.onmessage = (wssMsg) => {
  console.log(wssMsg);
  console.log(wssMsg.data);
};

document.body.onmousemove = (event) => {
  const messageBody = { x: event.clientX, y: event.clientY };

  ws.send(JSON.stringify(messageBody));
};
