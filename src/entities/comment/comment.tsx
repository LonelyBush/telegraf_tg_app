import { UserOutlined } from '@ant-design/icons';
import { Avatar, Flex, Space, Typography } from 'antd';
import { CommentFooter } from './coomentFooter/commentFooter';

interface CommentProps {
  username: string;
  date?: string;
  comment: string;
}

export const Comment = ({ username, comment }: CommentProps) => {
  return (
    <Flex gap="small">
      <Avatar size={40} icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
      <Flex vertical gap="small">
        <Space>
          <Typography.Title level={5} style={{ margin: 0 }}>
            {username}
          </Typography.Title>
          <span>{new Date().toDateString()}</span>
        </Space>
        <Typography.Text>{comment}</Typography.Text>
        <CommentFooter />
      </Flex>
    </Flex>
  );
};
