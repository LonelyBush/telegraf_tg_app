import { Flex } from 'antd';
import { Comment } from '../../../entities/comment/comment';
import { AddCommentForm } from './addComment/addComment';

export const CommentsSection = () => {
  return (
    <Flex
      vertical
      gap="middle"
      style={{
        alignSelf: 'center',
        width: '100%',
        maxWidth: '70rem',
        background: '#ffffff',
        padding: '20px 24px',
        borderRadius: '10px',
        marginBottom: '20px',
      }}
    >
      <AddCommentForm />
      <Flex vertical gap="small">
        <Comment
          username={'Berta Labubu'}
          date={'14-12-2009'}
          comment={'Cool comment from Berta Labubu'}
        />
        <Comment
          username={'Berta Labubu'}
          date={'14-12-2009'}
          comment={'Cool comment from Berta Labubu'}
        />
        <Comment
          username={'Berta Labubu'}
          date={'14-12-2009'}
          comment={'Cool comment from Berta Labubu'}
        />
        <Comment
          username={'Berta Labubu'}
          date={'14-12-2009'}
          comment={'Cool comment from Berta Labubu'}
        />
      </Flex>
    </Flex>
  );
};
