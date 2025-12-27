'use client';

import { List, Avatar, Badge, Empty, Spin, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { ChatInfo } from '@/lib/message-store';
import styles from './chatList.module.css';

interface ChatListProps {
  chats: ChatInfo[];
  loading?: boolean;
  selectedChatId?: number;
  onSelectChat: (chatId: number) => void;
}

export const ChatList = ({
  chats,
  loading,
  selectedChatId,
  onSelectChat,
}: ChatListProps) => {
  if (loading) {
    return (
      <div className={styles.listWrapper}>
        <Spin />
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className={styles.listWrapper}>
        <Empty description="Нет активных чатов" />
      </div>
    );
  }

  return (
    <div className={styles.listWrapper}>
      <Typography.Title level={5} style={{ margin: 0, color: '#333' }}>
        Чаты
      </Typography.Title>
      <List
        itemLayout="vertical"
        dataSource={chats}
        className={styles.listBlock}
        renderItem={(chat) => (
          <List.Item
            className={`${styles.chatItem} ${selectedChatId === chat.chatId ? styles.selected : ''}`}
            onClick={() => onSelectChat(chat.chatId)}
            classNames={{

            }}
          >
            <List.Item.Meta
              avatar={
                  <Avatar icon={<UserOutlined />} />
              }
              title={chat.firstName || chat.username || `Chat ${chat.chatId}`}
              description={chat.username ? `@${chat.username}` : undefined}
            />
          </List.Item>
        )}
      />
    </div>
  );
};
