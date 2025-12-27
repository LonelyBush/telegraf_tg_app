'use client';

import { Flex, Spin, Empty } from 'antd';
import styles from './chat.module.css';
import type { Message } from '@/lib/message-store';

interface ChatProps {
  messages: Message[];
  loading?: boolean;
}

export const Chat = ({ messages, loading }: ChatProps) => {
  if (loading) {
    return (
      <Flex justify="center" align="center" className={styles.chatWrapper}>
        <Spin />
      </Flex>
    );
  }

  if (messages.length === 0) {
    return (
      <Flex justify="center" align="center" className={styles.chatWrapper}>
        <Empty description="Нет сообщений" />
      </Flex>
    );
  }

  return (
    <Flex vertical className={styles.chatWrapper} gap={15}>
      {messages.map((message) => (
        <Flex
          key={message.id}
          className={`${styles.messageWrapper} ${message.from === 'user' ? styles.to : styles.from}`}
        >
          <div className={styles.messageContent}>
            {message.firstName && (
              <span className={styles.sender}>{message.firstName}</span>
            )}
            <span>{message.text}</span>
          </div>
        </Flex>
      ))}
    </Flex>
  );
};
