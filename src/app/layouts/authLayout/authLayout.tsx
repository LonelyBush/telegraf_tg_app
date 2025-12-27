import { Flex, Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { Outlet, useLocation } from 'react-router';
import style from './authLayout.module.css';
import { BreadCrumbs } from '../../../shared/ui/breadcrumbs/breadcrumbs';

export const AuthLayout = () => {
  const location = useLocation();

  return (
    <Layout className={style.layoutContainer}>
      <Header className={style.headerContainer}>
        <Flex align="center" gap="middle">
          <h1 className={style.title}>Bot app</h1>
        </Flex>
      </Header>
      <Content className={style.contentSection}>
        {location.pathname.length > 1 && <BreadCrumbs />}
        <Outlet />
      </Content>
    </Layout>
  );
};
