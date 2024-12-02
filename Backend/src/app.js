import express from "express";
import http from "http";
import WebSocket from "ws";

const PORT = process.env.PORT;
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get("/", (req, res) => {
  res.send("Chat application server is running");
});

wss.on("connection", (ws) => {
  console.log("New client connected");
  ws.on("message", (message) => {
    console.log(`Received ${message}`);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log(process.env.PORT);

app.listen(PORT, () => {
  "server is running";
});
