'use client';

import { Flex, Form, Input, type FormProps } from 'antd';
import styles from './messageInput.module.css';
import { ButtonIcon } from '@/shared/ui/button/ButtonIcon/ButtonIcon';
import { SendOutlined } from '@ant-design/icons';

interface FieldType {
  message: string;
}

interface MessageInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export const MessageInput = ({ onSend, disabled }: MessageInputProps) => {
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    onSend(values.message);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="Message"
      onFinish={onFinish}
      autoComplete="off"
      size="large"
      className={styles.formWrapper}
    >
      <Flex className={styles.inputWrapper}>
        <Form.Item<FieldType>
          name="message"
          rules={[{ required: true, message: 'Введите сообщение' }]}
          style={{ width: '100%' }}
        >
          <Input
            size="large"
            placeholder="Написать сообщение..."
            disabled={disabled}
          />
        </Form.Item>
        <Form.Item label={null} className={styles.btnWrapper}>
          <ButtonIcon
            type="submit"
            color="primary"
            icon={<SendOutlined />}
            disabled={disabled}
          />
        </Form.Item>
      </Flex>
    </Form>
  );
};
