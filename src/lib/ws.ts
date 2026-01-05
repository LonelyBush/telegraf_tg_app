import WebSocket, { WebSocketServer } from "ws";
import { messageStore } from "./message-store"

export interface BroadcastMessage {
  type: string,
  data: unknown,
}

export const getChats = (ws: WebSocket) => {
  const goJson = JSON.stringify(messageStore.getChats());

  ws.send(goJson, (err) => {
    if (err) {
      ws.send(JSON.stringify({ error: 'Send failed' }));
    }
  });
}

export const broadcastMessage = (wss: WebSocketServer, call: BroadcastMessage) => {
  const message = JSON.stringify(call);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};