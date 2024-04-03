import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

import HomePage from './pages/home/HomePage';
import { persistor, store } from './store/store';
import theme from './theme/theme';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  // {
  //   path: '/oauth/kakao/login',
  //   element: <KakaoRedirectPage />,
  // },
  // {
  //   path: '/oauth/naver/login',
  //   element: <NaverRedirectPage />,
  // },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
