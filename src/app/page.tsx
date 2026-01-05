'use client';

import { useState } from 'react';
import { Flex, Typography } from 'antd';
import style from './page.module.css';
import { MessageInput } from '@/components/chat/messageInput';
import { Chat } from '@/components/chat/chat';
import { ChatList } from '@/components/chat/chatList';
import { useChats } from '@/hooks/useMessages';

export default function Home() {
  const { chats, setSelectedChatId, selectedChatId, sendMessage, messages } = useChats();

  const handleSend = (text: string) => {
    if (selectedChatId) {
      sendMessage(text);
    }
  };

  return (
    <Flex gap={20} className={style.homeContainer}>
      <Flex vertical gap={10} style={{width: '40%'}}>
        <ChatList
          chats={chats}
          selectedChatId={selectedChatId}
          onSelectChat={setSelectedChatId}
        />
      </Flex>

      <Flex vertical justify="space-between" style={{width: '60%'}}>
        {selectedChatId ? (
          <>
          <Flex align='center' vertical>
            <Chat messages={messages} />
            <MessageInput onSend={handleSend} />
          </Flex>
          </>
        ) : (
          <Flex
            justify="center"
            align="center"
            style={{ height: '100%', color: '#999' }}
          >
            <Typography.Text type="secondary">
              Выберите чат слева
            </Typography.Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
