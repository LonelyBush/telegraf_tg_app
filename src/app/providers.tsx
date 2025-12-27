'use client';

import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { theme } from '@/configs/themeConfig';
import { store } from '@/store/store';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider theme={theme}>
      <Provider store={store}>{children}</Provider>
    </ConfigProvider>
  );
}
