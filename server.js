const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let admin = null;
let client = null;

wss.on('connection', ws => {
  ws.on('message', message => {
    let data;
    try { data = JSON.parse(message); } catch { return; }

    if(data.type === 'role') {
      if(data.role === 'admin') {
        admin = ws;
        console.log("Admin connecté");
      } else if(data.role === 'client') {
        client = ws;
        console.log("Client connecté");
      }
      return;
    }

    // Relais des messages WebRTC (offer, answer, candidate)
    if(data.type === 'webrtc') {
      if(ws === client && admin) {
        admin.send(JSON.stringify(data));
      } else if(ws === admin && client) {
        client.send(JSON.stringify(data));
      }
      return;
    }

    // Commandes envoyées par admin au client
    if(data.type === 'command' && ws === admin && client) {
      client.send(JSON.stringify({ type: 'command', command: data.command }));
      return;
    }

    // Status du client vers admin
    if(data.type === 'status' && ws === client && admin) {
      admin.send(JSON.stringify({ type: 'status', message: data.message }));
      return;
    }
  });

  ws.on('close', () => {
    if(ws === admin) {
      admin = null;
      console.log("Admin déconnecté");
    }
    if(ws === client) {
      client = null;
      console.log("Client déconnecté");
    }
  });
});

console.log("Serveur WebSocket lancé sur le port 8080");