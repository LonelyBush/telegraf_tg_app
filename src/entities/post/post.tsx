import { Avatar, Card, Divider, Flex, Space, Typography } from 'antd';
import style from './post.module.css';
import { NavLink } from 'react-router';
import { UserOutlined } from '@ant-design/icons';

const { Paragraph, Text } = Typography;

interface PostsProps {
  id: number;
  title: string;
  body: string;
  userName: string;
}

export const Post = ({ title, body, id, userName }: PostsProps) => {
  return (
    <Card
      className={style.postContainer}
      title={title}
      extra={<NavLink to={`/forum/${id}`}>More</NavLink>}
    >
      <Paragraph
        ellipsis={{
          rows: 3,
        }}
        style={{ margin: 0 }}
      >
        {body}
      </Paragraph>
      <Flex vertical>
        <Divider style={{ margin: '12px 0' }} />
        <Flex align="center" justify="space-between">
          <Space size="middle">
            <Avatar
              size={40}
              icon={<UserOutlined />}
              style={{ cursor: 'pointer' }}
            />
            <Text>{userName}</Text>
          </Space>
        </Flex>
      </Flex>
    </Card>
  );
};
