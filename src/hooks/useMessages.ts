'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Message, ChatInfo } from '@/lib/message-store';

export function useMessages(chatId?: number) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = useCallback(async () => {
    try {
      const url = chatId
        ? `/api/messages?chatId=${chatId}`
        : '/api/messages';
      const res = await fetch(url);
      const data = await res.json();
      setMessages(data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  }, [chatId]);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  const sendMessage = async (text: string) => {
    if (!chatId) return;

    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId, text }),
      });
      await fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return { messages, loading, sendMessage, refetch: fetchMessages };
}

export function useChats() {
  const [chats, setChats] = useState<ChatInfo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChats = useCallback(async () => {
    try {
      const res = await fetch('/api/chats');
      const data = await res.json();
      setChats(data.chats);
    } catch (error) {
      console.error('Error fetching chats:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChats();
    const interval = setInterval(fetchChats, 3000);
    return () => clearInterval(interval);
  }, [fetchChats]);

  return { chats, loading, refetch: fetchChats };
}
