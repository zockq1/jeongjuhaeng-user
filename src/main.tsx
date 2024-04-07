import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

import KakaoLoginPage from '@/app/auth/KakaoLoginPage';
import NaverLoginPage from '@/app/auth/NaverLoginPage';
import HomePage from '@/app/home/HomePage';
import ChapterListPage from '@/app/topic/ChapterListPage';
import LearningTopicPage from '@/app/topic/LearningTopicPage';
import { persistor, store } from '@/store/store';
import theme from '@/theme/theme';

import JJHListPage from './app/topic/JJHListPage';
import LearningTimelinePage from './app/topic/LearningTimelinePage';
import TimelineListPage from './app/topic/TimelineListPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/oauth/kakao/login',
    element: <KakaoLoginPage />,
  },
  {
    path: '/oauth/naver/login',
    element: <NaverLoginPage />,
  },
  {
    path: '/learning',
    element: <ChapterListPage />,
  },
  {
    path: '/learning/chapter',
    element: <LearningTopicPage />,
  },
  {
    path: '/timeline-list',
    element: <TimelineListPage />,
  },
  {
    path: '/timeline',
    element: <LearningTimelinePage />,
  },
  {
    path: 'jeong-ju-haeng',
    element: <JJHListPage />,
  },
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
