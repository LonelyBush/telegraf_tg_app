import { Flex } from 'antd';
import styles from './chat.style.module.css';
const messages = [
  {
    text: 'Hey, how are you doing?',
    from: 'user1',
    to: 'user2',
  },
  {
    text: 'I am good, thanks! What about you?',
    from: 'user2',
    to: 'user1',
  },
  {
    text: 'Pretty well, just working on a project',
    from: 'user1',
    to: 'user2',
  },
  {
    text: 'Sounds interesting! What kind of project?',
    from: 'user2',
    to: 'user1',
  },
  {
    text: 'A chat app with React and TypeScript',
    from: 'user1',
    to: 'user2',
  },
  {
    text: 'Nice! Let me know if you need any help',
    from: 'user2',
    to: 'user1',
  },
  {
    text: 'Will do, appreciate it!',
    from: 'user1',
    to: 'user2',
  },
  {
    text: 'By the way, did you see the game last night?',
    from: 'user2',
    to: 'user1',
  },
  {
    text: 'No, I missed it. Who won?',
    from: 'user1',
    to: 'user2',
  },
  {
    text: 'Home team, 3-2 in overtime!',
    from: 'user2',
    to: 'user1',
  },
  {
    text: 'Home team, 3-2 in overtime!',
    from: 'user2',
    to: 'user1',
  },
  {
    text: 'Home team, 3-2 in overtime!',
    from: 'user2',
    to: 'user1',
  },
];

export const Chat = () => {
  const chatBoss = 'user1';
  const getMessages = messages.map((message, index) => {
    return (
      <Flex
        key={index}
        className={`${styles.messageWrapper} ${message.from !== chatBoss ? styles.from : styles.to}`}
      >
        {message.text}
      </Flex>
    );
  });
  return (
    <Flex vertical className={styles.chatWrapper} gap={15}>
      {getMessages}
    </Flex>
  );
};
