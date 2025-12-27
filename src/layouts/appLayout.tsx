'use client';

import { Flex, Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { usePathname } from 'next/navigation';
import style from './appLayout.module.css';
import { BreadCrumbs } from '@/shared/ui/breadcrumbs/breadcrumbs';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <Layout className={style.layoutContainer}>
      <Header className={style.headerContainer}>
        <Flex align="center" gap="middle">
          <h1 className={style.title}>Bot app</h1>
        </Flex>
      </Header>
      <Content className={style.contentSection}>
        {pathname.length > 1 && <BreadCrumbs />}
        {children}
      </Content>
    </Layout>
  );
};
