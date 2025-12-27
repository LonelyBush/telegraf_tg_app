import { Flex } from 'antd';
import style from './home.module.css';
import { MessageInput } from './messageInput';
import { Chat } from './chat';
// const { Title } = Typography;

export const Home = () => {
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
};
