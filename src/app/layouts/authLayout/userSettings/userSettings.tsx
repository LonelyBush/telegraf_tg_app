import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Flex } from 'antd';
import { noAuthItems } from './settings';

export const UserSettings = () => {
  return (
    <Flex gap="middle" align="center">
      <Dropdown menu={{ items: noAuthItems }} trigger={['click']}>
        <Avatar
          size={40}
          icon={<UserOutlined />}
          style={{ cursor: 'pointer' }}
        ></Avatar>
      </Dropdown>
    </Flex>
  );
};
