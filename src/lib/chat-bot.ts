import '../configs/envConfig'
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { messageStore } from './message-store';
import { v4 as uuidv4 } from 'uuid';



const bot = new Telegraf(process.env.BOT_TOKEN ?? '');

bot.command('start', async (ctx) => {
  const { chat, from } = ctx.message;

  messageStore.addChat({
    chatId: chat.id,
    username: from?.username,
    firstName: from?.first_name,
    lastName: from?.last_name,
  });

  await ctx.reply('Привет! Я бот. Напиши мне что-нибудь, и оператор ответит тебе.');
});

bot.on(message('text'), async (ctx) => {
  const { chat, from, text } = ctx.message;

  messageStore.addChat({
    chatId: chat.id,
    username: from?.username,
    firstName: from?.first_name,
    lastName: from?.last_name,
  });

  messageStore.addMessage({
    id: `${uuidv4()}`,
    chatId: chat.id,
    text: text,
    from: 'user',
    username: from?.username,
    firstName: from?.first_name,
    timestamp: Date.now(),
  });
  console.log(`[Bot] Message from ${from?.username || from?.first_name}: ${text}`);
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
}

export function startBot() {
  bot.launch()
  console.log('[Bot] Started');

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
}

export { bot };
