import { Button, Dropdown, Grid, Menu } from 'antd';
import { navItems } from './items';
import { MenuOutlined } from '@ant-design/icons';
const { useBreakpoint } = Grid;

export const Navigation = () => {
  const screens = useBreakpoint();

  return screens.xs ? (
    <Dropdown menu={{ items: navItems }} trigger={['click']}>
      <Button size="middle" shape="circle" icon={<MenuOutlined />} />
    </Dropdown>
  ) : (
    <Menu
      mode="horizontal"
      items={navItems}
      style={{ minWidth: 0, flex: 'auto', width: '15rem' }}
    />
  );
};
