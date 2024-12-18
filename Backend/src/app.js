// server.mjs
import express from 'express';
import WebSocket from 'ws';

const app = express();
const port = 5000;

// Set up the WebSocket server
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  console.log('A new client connected.');

  // Handling incoming messages from the client
  ws.on('message', (message) => {
    console.log('Received:', message);
    ws.send(`You said: ${message}`);
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected.');
  });
});

// Integrating WebSocket with Express server
app.server = app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

app.server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// Simple route to check server
app.get('/', (req, res) => {
  res.send('WebSocket server running!');
});
