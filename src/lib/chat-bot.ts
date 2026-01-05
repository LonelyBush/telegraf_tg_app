import '../configs/envConfig'
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { ChatInfo, Message, messageStore } from './message-store';
import { v4 as uuidv4 } from 'uuid';
import { RawData, WebSocketServer } from 'ws';
import { broadcastMessage, getChats } from './ws';
import { wss } from '../../server';

export interface WSCall {
  text: string;
  chatId: number;
}


const bot = new Telegraf(process.env.BOT_TOKEN ?? '');

bot.command('start', async (ctx) => {
  const { chat, from } = ctx.message;

  const newChat: ChatInfo = {
    chatId: chat.id,
    username: from?.username,
    firstName: from?.first_name,
    lastName: from?.last_name,
  }

  messageStore.addChat(newChat);
  broadcastMessage(wss, {type: 'new_chat', data: messageStore.getChats()});

  await ctx.reply('Привет! Я бот. Напиши мне что-нибудь, и оператор ответит тебе.');
});

bot.on(message('text'), async (ctx) => {
  const { chat, from, text } = ctx.message;

  const newMessage: Message = {
    id: `${uuidv4()}`,
    chatId: chat.id,
    text: text,
    from: 'user',
    username: from?.username,
    firstName: from?.first_name,
    timestamp: Date.now(),
  }

  messageStore.addChat({
    chatId: chat.id,
    username: from?.username,
    firstName: from?.first_name,
    lastName: from?.last_name,
  });

  messageStore.addMessage(newMessage);
  console.log(`[Bot] Message from ${from?.username || from?.first_name}: ${text}`);

  broadcastMessage(wss, {type: 'message_from_user', data: messageStore.getMessages(chat.id)});
});


export async function sendMessageToChat(chatId: number, text: string) {
  await bot.telegram.sendMessage(chatId, text);

  messageStore.addMessage({
    id: `${chatId}-${Date.now()}`,
    chatId,
    text,
    from: 'bot',
    timestamp: Date.now(),
  });

  broadcastMessage(wss, {type: 'message_from_bot', data: messageStore.getMessages(chatId)});
}

export function startBot() {
  bot.launch()
  console.log('[Bot] Started');

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
}

export { bot };
