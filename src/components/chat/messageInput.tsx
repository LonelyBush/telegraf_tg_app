'use client';

import { Flex, Form, Input, type FormProps } from 'antd';
import styles from './messageInput.module.css';
import { ButtonIcon } from '@/shared/ui/button/ButtonIcon/ButtonIcon';
import { SendOutlined } from '@ant-design/icons';

interface FieldType {
  message: string;
}

export const MessageInput = () => {
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  return (
    <Form
      layout="vertical"
      name="Message"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      size="large"
      className={styles.formWrapper}
    >
      <Flex className={styles.inputWrapper}>
        <Form.Item<FieldType>
          name="message"
          rules={[{ required: true, message: 'Please input your message!' }]}
          style={{ width: '100%' }}
        >
          <Input size="large" placeholder="Write message text" />
        </Form.Item>
        <Form.Item label={null} className={styles.btnWrapper}>
          <ButtonIcon type="submit" color="primary" icon={<SendOutlined />} />
        </Form.Item>
      </Flex>
    </Form>
  );
};
