export interface Message {
  id: string;
  chatId: number;
  text: string;
  from: 'user' | 'bot';
  username?: string;
  firstName?: string;
  timestamp: number;
}

export interface ChatInfo {
  chatId: number;
  username?: string;
  firstName?: string;
  lastName?: string;
}

class MessageStore {
  private messages: Message[] = [];
  private chats: Map<number, ChatInfo> = new Map();

  addMessage(message: Message) {
    this.messages.push(message);
    console.log('[Store] Messages count:', this.messages.length);
  }

  getMessages(chatId?: number): Message[] {
    if (chatId) {
      return this.messages.filter((m) => m.chatId === chatId);
    }
    return this.messages;
  }

  getMessagesSince(timestamp: number, chatId?: number): Message[] {
    return this.getMessages(chatId).filter((m) => m.timestamp > timestamp);
  }

  addChat(chat: ChatInfo) {
    this.chats.set(chat.chatId, chat);
    console.log('[Store] Chats count:', this.chats.size);
  }

  getChats(): ChatInfo[] {
    return Array.from(this.chats.values());
  }

  getChat(chatId: number
  ): ChatInfo | undefined {
    return this.chats.get(chatId);
  }
}


const globalForStore = globalThis as unknown as {
  messageStore: MessageStore | undefined;
};

export const messageStore = globalForStore.messageStore ?? new MessageStore();

globalForStore.messageStore = messageStore;

