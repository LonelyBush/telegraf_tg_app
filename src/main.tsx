import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { store } from './app/store/store.ts';
import { Provider } from 'react-redux';
import { Router } from './app/routes/routes.tsx';
import { ConfigProvider } from 'antd';
import { theme } from './app/configs/themeConfig.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={theme}>
      <Provider store={store}>
        <Router />
      </Provider>
    </ConfigProvider>
  </StrictMode>,
);
