import {
  CaretDownFilled,
  CommentOutlined,
  DislikeOutlined,
  LikeOutlined,
} from '@ant-design/icons';
import { Button, Flex, Space } from 'antd';
import { useState } from 'react';
import { AddCommentForm } from '../../../pages/post/comments/addComment/addComment';
import style from './commentFooter.module.css';
import { Comment } from '../comment';

const mockRepliesData = [
  {
    username: 'Bob Bobobvski',
    comment: 'Cool comment from Bob',
  },
  {
    username: 'Bob Bobobvski2',
    comment: 'Cool comment from Bob',
  },
  {
    username: 'Bob Bobobvski3',
    comment: 'Cool comment from Bob',
  },
  {
    username: 'Bob Bobobvski4',
    comment: 'Cool comment from Bob',
  },
  {
    username: 'Bob Bobobvski5',
    comment: 'Cool comment from Bob',
  },
];

export const CommentFooter = () => {
  const [isReply, setReply] = useState(false);
  const [isShowReplies, setShowReplies] = useState(false);

  return (
    <>
      <Flex gap="middle" align="center">
        <Space>
          <LikeOutlined style={{ cursor: 'pointer' }} />
          <span>0</span>
        </Space>
        <Space>
          <DislikeOutlined style={{ cursor: 'pointer' }} />
          <span>0</span>
        </Space>
        <Button
          shape="circle"
          icon={<CommentOutlined />}
          style={{ border: 0, boxShadow: '#ffffff' }}
          onClick={() => setReply(!isReply)}
        >
          Reply
        </Button>
      </Flex>
      {isReply && <AddCommentForm />}
      <button
        className={style.replyBtn}
        onClick={() => setShowReplies(!isShowReplies)}
      >
        <CaretDownFilled style={{ fontSize: '12px' }} />
        <span>See 52 replies</span>
      </button>
      {isShowReplies &&
        mockRepliesData.map((elem) => {
          return (
            <Comment
              key={Math.random() * 1}
              username={elem.username}
              comment={elem.comment}
              date="sxasdas"
            />
          );
        })}
    </>
  );
};
