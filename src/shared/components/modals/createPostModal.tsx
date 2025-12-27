import { Form, Input, Modal, type FormProps } from 'antd';
import { useState, type Dispatch } from 'react';
import { ButtonPrimary } from '../../ui/button/ButtonPrimary/ButtonPrimary';

interface CreatePostModalProps {
  open: boolean;
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
}
interface FieldType {
  title?: string;
  text?: string;
}

export const CreatePostModal = ({
  setOpenModal,
  open,
}: CreatePostModalProps) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenModal(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title="Create your post"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={null}
      styles={{
        body: { display: 'flex', justifyContent: 'center' },
      }}
    >
      <Form
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
      >
        <Form.Item<FieldType>
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input yout post title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Description"
          name="text"
          rules={[
            {
              required: true,
              message: 'Please input description for your post',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={null}>
          <ButtonPrimary type="submit">Submit</ButtonPrimary>
        </Form.Item>
      </Form>
    </Modal>
  );
};
