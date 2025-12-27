import { Flex, Layout } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { Outlet, useLocation } from 'react-router';
import style from './authLayout.module.css';
import { BreadCrumbs } from '../../../shared/ui/breadcrumbs/breadcrumbs';
import { Navigation } from './navigation/navigation';
import { UserSettings } from './userSettings/userSettings';

export const AuthLayout = () => {
  const location = useLocation();

  return (
    <Layout className={style.layoutContainer}>
      <Header className={style.headerContainer}>
        <Flex align="center" gap="middle">
          <h1 className={style.title}>Forum</h1>
          <Navigation />
        </Flex>
        <UserSettings />
      </Header>
      <Content className={style.contentSection}>
        {location.pathname.length > 1 && <BreadCrumbs />}
        <Outlet />
      </Content>
      <Footer className={style.footerSection}>
        <Flex vertical gap="sm">
          <span>Forum ©{new Date().getFullYear()}</span>
          <span>Created by LonelyBush</span>
        </Flex>
      </Footer>
    </Layout>
  );
};
