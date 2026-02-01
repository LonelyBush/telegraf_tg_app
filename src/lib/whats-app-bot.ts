import { SessionData, State, StorageAdapter, WhatsAppBot } from "@green-api/whatsapp-chatbot-js-v2";
import { broadcastMessage } from "./ws";
import { ChatInfo, Message, messageStore } from "./message-store";
import { v4 as uuidv4 } from 'uuid';
import { wss } from "../../server";




const bot = new WhatsAppBot({
	idInstance: process.env.WHATSAPP_ID_INSTANCE || "your-id",
	apiTokenInstance: process.env.WHATSAPP_API_TOKEN || '',
  defaultState: "chat_menu",
});


const chatState: State = {
	name: "chat_menu",
	async onEnter(message) {
		await bot.sendText(
			message.chatId,
			"Welcome! Operator will assist you shortly"
		);

      const { chatId, senderName, contact } = message;
      console.log(senderName, contact)
      const newChat: ChatInfo = {
        chatId: chatId,
        username: senderName,
        firstName: contact?.displayName,
        messengerType: 'whatsapp',
      }
      messageStore.addChat(newChat);
      broadcastMessage(wss, {type: 'new_chat', data: messageStore.getChats()});
	},
	async onMessage(message) {
      const { chatId, senderName, text, contact } = message;

  const newMessage: Message = {
    id: `${uuidv4()}`,
    chatId: chatId,
    text: text ?? '',
    from: 'user',
    username: senderName,
    firstName: contact?.displayName,
    timestamp: Date.now(),
  }

  messageStore.addChat({
    chatId: chatId,
    username: senderName,
    firstName: contact?.displayName,
    lastName: contact?.displayName,
    messengerType: 'whatsapp',
  });

  messageStore.addMessage(newMessage);
  console.log(`[Bot] Message from ${senderName}: ${text}`);
   broadcastMessage(wss, {type: 'message_from_user', data: messageStore.getMessages(chatId)});
	}
};


export const sendWhatsAppMessageToChat = async (chatId: string, text: string) => {
  await bot.sendText(chatId, text);

    messageStore.addMessage({
    id: `${chatId}-${Date.now()}`,
    chatId,
    text,
    from: 'bot',
    timestamp: Date.now(),
  });

  broadcastMessage(wss, {type: 'message_from_bot', data: messageStore.getMessages(chatId)});
}


bot.addState(chatState);

export function startWhatsAppBot() {
  bot.start()
  console.log('[Bot-WhatsApp] Started');

  process.once('SIGINT', () => bot.stop());
  process.once('SIGTERM', () => bot.stop());
}

export {bot}