import { useParams } from 'react-router';
import { useGetPostQuery } from '../../app/api/forumApi';
import { Avatar, Flex, Space, Spin, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { CommentsSection } from './comments/commentsSection';

const { Text, Title } = Typography;

export const Post = () => {
  const params = useParams();
  const postId = params.postId ?? 1;
  const { data: post, isLoading } = useGetPostQuery(Number(postId));

  if (post === undefined && isLoading) {
    return <Spin size="large" />;
  }

  return (
    <Flex vertical gap="middle">
      <Flex
        vertical
        gap="middle"
        style={{
          alignSelf: 'center',
          width: '100%',
          maxWidth: '70rem',
          background: '#ffffff',
          padding: '12px 24px',
          borderRadius: '10px',
        }}
      >
        <Space size="middle">
          <Avatar
            size={40}
            icon={<UserOutlined />}
            style={{ cursor: 'pointer' }}
          />
          <Text>{post?.userName}</Text>
        </Space>
        <Title level={2} style={{ textAlign: 'start', margin: 0 }}>
          {post?.title}d
        </Title>
        <Flex align="center" justify="space-between"></Flex>
        <Text>{post?.body}</Text>
      </Flex>
      <CommentsSection />
    </Flex>
  );
};
