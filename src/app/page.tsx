'use client';

import { Flex } from 'antd';
import style from './page.module.css';
import { MessageInput } from '@/components/chat/messageInput';
import { Chat } from '@/components/chat/chat';

export default function Home() {
  return (
    <Flex
      vertical
      justify="space-between"
      align="center"
      className={style.homeContainer}
    >
      <Chat />
      <MessageInput />
    </Flex>
  );
}
