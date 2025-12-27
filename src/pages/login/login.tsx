import { Flex, Form, Input, Typography, type FormProps } from 'antd';
import { ButtonPrimary } from '../../shared/ui/button/ButtonPrimary/ButtonPrimary';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router';

interface FieldType {
  username?: string;
  password?: string;
}

export const Login = () => {
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
      layout="vertical"
      name="Login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="large"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        width: '100%',
        maxWidth: '25rem',
        background: '#ffffff',
        padding: '0 24px',
        borderRadius: '10px',
      }}
    >
      <Typography.Title level={3} style={{ textAlign: 'center' }}>
        Login
      </Typography.Title>
      <Form.Item<FieldType>
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>

      <Form.Item<FieldType>
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item label={null}>
        <Flex vertical gap="small">
          <ButtonPrimary type="submit">Submit</ButtonPrimary>
          <Flex justify="space-between">
            <span>Don&apos;t have an account ?</span>
            <NavLink to="/registration">Sign Up!</NavLink>
          </Flex>
        </Flex>
      </Form.Item>
    </Form>
  );
};
