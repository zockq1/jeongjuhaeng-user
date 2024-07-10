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

import App from './App';
import PrivacyPage from './app/auth/PrivacyPage';
import OptionPage from './app/home/OptionPage';
import JJHChapterQuizPage from './app/jjh/JJHChapterQuizPage';
import JJHListPage from './app/jjh/JJHListPage';
import JJHTimelinePage from './app/jjh/JJHTimelinePage';
import JJHTimelineQuizPage from './app/jjh/JJHTimelineQuizPage';
import JJHTopicPage from './app/jjh/JJHTopicPage';
import JJHTopicQuizPage from './app/jjh/JJHTopicQuizPage';
import QuizCategoryListPage from './app/quiz/QuizCategoryListPage';
import QuizCategoryTopicPage from './app/quiz/QuizCategoryTopicPage';
import LearningTimelinePage from './app/timeline/LearningTimelinePage';
import TimelineListPage from './app/timeline/TimelineListPage';
import TimelineQuizPage from './app/timeline/TimelineQuizPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      { path: '/option', element: <OptionPage /> },
      { path: '/option/privacy', element: <PrivacyPage /> },
      {
        path: '/oauth/kakao/login',
        element: <KakaoLoginPage />,
      },

      {
        path: '/oauth/naver/login',
        element: <NaverLoginPage />,
      },
      {
        path: '/chapter',
        element: <ChapterListPage />,
      },
      {
        path: '/chapter/:chapterId',
        element: <LearningTopicPage />,
      },
      {
        path: '/timeline',
        element: <TimelineListPage />,
      },
      {
        path: '/timeline/:timelineId',
        element: <LearningTimelinePage />,
      },
      {
        path: '/timeline/:timelineId/quiz',
        element: <TimelineQuizPage />,
      },
      {
        path: 'jeong-ju-haeng',
        element: <JJHListPage />,
      },
      {
        path: 'jeong-ju-haeng/chapter',
        element: <JJHTopicPage />,
      },
      {
        path: 'jeong-ju-haeng/timeline',
        element: <JJHTimelinePage />,
      },
      {
        path: 'jeong-ju-haeng/chapter/quiz',
        element: <JJHChapterQuizPage />,
      },
      {
        path: 'jeong-ju-haeng/topic/quiz',
        element: <JJHTopicQuizPage />,
      },
      {
        path: 'jeong-ju-haeng/timeline/quiz',
        element: <JJHTimelineQuizPage />,
      },
      {
        path: '/quiz',
        element: <QuizCategoryListPage />,
      },
      {
        path: '/quiz/:quizId',
        element: <QuizCategoryTopicPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.Fragment>,
);
