'use client';

import { useState } from 'react';
import { Flex, Typography } from 'antd';
import style from './page.module.css';
import { MessageInput } from '@/components/chat/messageInput';
import { Chat } from '@/components/chat/chat';
import { ChatList } from '@/components/chat/chatList';
import { useMessages, useChats } from '@/hooks/useMessages';

export default function Home() {
  const [selectedChatId, setSelectedChatId] = useState<number | undefined>();
  const { chats, loading: chatsLoading } = useChats();
  const { messages, loading: messagesLoading, sendMessage } = useMessages(selectedChatId);

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
          loading={chatsLoading}
          selectedChatId={selectedChatId}
          onSelectChat={setSelectedChatId}
        />
      </Flex>

      <Flex vertical justify="space-between" style={{width: '60%'}}>
        {selectedChatId ? (
          <>
          <Flex align='center' vertical>
            <Chat messages={messages} loading={messagesLoading} />
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
