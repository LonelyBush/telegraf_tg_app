import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { sendMessageToChat, startBot } from './src/lib/chat-bot';
import { RawData, WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { broadcastMessage, getChats } from '@/lib/ws';
import { messageStore } from '@/lib/message-store';
import { sendWhatsAppMessageToChat, startWhatsAppBot } from '@/lib/whats-app-bot';

export interface WSCall {
  text: string;
  chatId: string;
}

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = parseInt(process.env.PORT || '3001', 10);

const app = next({ dev, hostname, port });
  const handle = app.getRequestHandler();

app.prepare().then(() => {
  startBot();
  startWhatsAppBot()

  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  }).listen(port, () => {
    console.log(`> http://${hostname}:${port}`);
  });
});

export const wss = new WebSocketServer({ port: 8081 });

wss.on('connection', (ws) => {
  const client_Id = uuidv4();
  console.log(`Новый клиент подключился! его уникальный ID ${client_Id}`);
  console.log(`Отправляю список чатов для ID ${client_Id}`);
  broadcastMessage(wss, {type: 'get_chats', data: messageStore.getChats()});

  ws.on('message', (message: RawData) => {
  const messageString = message.toString();
  const { text, chatId }: WSCall = JSON.parse(messageString);
  const chat = messageStore.getChat(chatId);
      if(chat && chat.messengerType === 'telegram'){
      sendMessageToChat(chatId, text)
      }else {
      sendWhatsAppMessageToChat(chatId, text)
      }
  });

  ws.on('close', () => {
    console.log(`Клиент отключился ID ${client_Id}`);
  });
});

process.on('SIGINT', () => {
  app.close();
  wss.close(() => {
    console.log('WebSocket server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  app.close();
  wss.close(() => {
    console.log('WebSocket server closed');
    process.exit(0);
  });
});

