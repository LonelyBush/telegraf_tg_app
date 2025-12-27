import { Avatar, Flex, Form, type FormProps } from 'antd';
import { SendOutlined, UserOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { ButtonIcon } from '../../../../shared/ui/button/ButtonIcon/ButtonIcon';

interface FieldType {
  comment: string;
}

export const AddCommentForm = () => {
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="Comment"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="large"
      style={{
        display: 'flex',
        gap: '8px',
        width: '100%',
      }}
    >
      <Avatar size={40} icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
      <Flex style={{ position: 'relative' }}>
        <Form.Item<FieldType>
          name="comment"
          rules={[
            { required: true, message: 'You can`t send empty comment !' },
          ]}
        >
          <TextArea
            rows={4}
            cols={200}
            autoSize={{ minRows: 4, maxRows: 7 }}
            placeholder="Write your comment here..."
            style={{
              boxSizing: 'border-box',
              width: '100%',
              maxWidth: '60rem',
            }}
          />
        </Form.Item>
        <Form.Item
          label={null}
          style={{ position: 'absolute', bottom: '5%', right: '1%' }}
        >
          <ButtonIcon
            type="submit"
            shape="circle"
            icon={<SendOutlined style={{ transform: 'rotate(-45deg)' }} />}
          />
        </Form.Item>
      </Flex>
    </Form>
  );
};
