'use client';

import { ConfigProvider } from 'antd';
import { theme } from '@/configs/themeConfig';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider theme={theme}>
      {children}
    </ConfigProvider>
  );
}
