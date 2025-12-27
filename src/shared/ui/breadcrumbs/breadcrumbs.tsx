'use client';

import { Breadcrumb } from 'antd';
import { usePathname } from 'next/navigation';
import { generateBreadCrumbsItems } from './generateBreadCrumbsItems';

export const BreadCrumbs = () => {
  const pathname = usePathname();

  return (
    <Breadcrumb
      style={{ margin: '16px 0' }}
      separator=">"
      items={[
        { title: 'Home', href: '/' },
        ...generateBreadCrumbsItems(pathname),
      ]}
    />
  );
};
