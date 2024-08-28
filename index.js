const WebSocket = require("ws");
const { Client, LocalAuth } = require("whatsapp-web.js");

const server = new WebSocket.Server({ port: 3000 });

server.on("connection", (socket) => {
  console.log("Client connected to websocket");

  const client = new Client({
    authStrategy: new LocalAuth(),
  });
  
  client.on("qr", (qr) => {
    socket.send(qr)
  });
  
  client.on("ready", () => {
    console.log("Client is ready");
    socket.send(JSON.stringify({"message": "Client is ready"}))
  });
  
  client.initialize();

  client.on("message", (message) => {
    socket.send(JSON.stringify({"message": message.body}))
  });
});
