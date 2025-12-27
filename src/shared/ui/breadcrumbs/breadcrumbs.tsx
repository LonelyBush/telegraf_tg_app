import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router';
import { generateBreadCrumbsItems } from './generateBreadCrumbsItems';

export const BreadCrumbs = () => {
  const location = useLocation();

  return (
    <Breadcrumb
      style={{ margin: '16px 0' }}
      separator=">"
      items={[
        { title: 'Home', href: '/' },
        ...generateBreadCrumbsItems(location.pathname),
      ]}
    />
  );
};
