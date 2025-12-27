import { HomeFilled, MessageOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { NavLink } from 'react-router';

export const navItems: MenuProps['items'] = [
  {
    label: <NavLink to="/">Home</NavLink>,
    key: 'home',
    icon: <HomeFilled twoToneColor="#fafafa" />,
  },
  {
    label: <NavLink to="/forum">Forum</NavLink>,
    key: 'forum',
    icon: <MessageOutlined twoToneColor="#fafafa" />,
  },
];
