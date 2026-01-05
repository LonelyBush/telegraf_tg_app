'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { Message, ChatInfo } from '@/lib/message-store';

export function useChats() {
  const socketRef = useRef<WebSocket>(null);
  const [selectedChatId, setSelectedChatId] = useState<number>();
  const [chats, setChats] = useState<ChatInfo[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:8081');
    socketRef.current.onopen = () => {
      console.log('Connected to WebSocket');
    };
    socketRef.current.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      //console.log('Message received:', parsed);
      if(parsed.type === 'new_chat'){
        //console.log('new_chat', parsed.data);
        setChats(parsed.data)
      }
      if(parsed.type === 'get_chats'){
        console.log('get_chats', parsed.data);
        setChats(parsed.data)
      }
      if(parsed.type === 'message_from_user' || parsed.type === 'message_from_bot'){
        //console.log(event.data);
        if(selectedChatId === parsed.data.chatId){
          setMessages(parsed.data);
        }
      }
    };
    socketRef.current.onclose = () => {
      console.log('WebSocket connection closed');
    };
    return () => {
      if (socketRef.current){
        socketRef.current.close();
      }
    };
  }, []);

  const sendMessage = (message: string) => {
    const createCall = {
      chatId: selectedChatId,
      text: message,
    }
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
         socketRef.current.send(JSON.stringify(createCall));
    }
  }

  return { chats, setSelectedChatId, selectedChatId, sendMessage, messages };
}
