import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authApi } from './api/authApi';
import { chapterApi } from './api/chapterApi';
import { jjhApi } from './api/jjhApi';
import { questionApi } from './api/questionApi';
import { timelineApi } from './api/timelineApi';
import { topicApi } from './api/topicApi';
import { withdrawalApi } from './api/withdrawalApi';
import authReducer from './slices/authSlice';
import keywordReducer from './slices/keywordSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['content', 'auth', 'keyword'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  keyword: keywordReducer,
  [chapterApi.reducerPath]: chapterApi.reducer,
  [topicApi.reducerPath]: topicApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [questionApi.reducerPath]: questionApi.reducer,
  [timelineApi.reducerPath]: timelineApi.reducer,
  [jjhApi.reducerPath]: jjhApi.reducer,
  [withdrawalApi.reducerPath]: withdrawalApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(
      chapterApi.middleware,
      topicApi.middleware,
      authApi.middleware,
      questionApi.middleware,
      timelineApi.middleware,
      jjhApi.middleware,
      withdrawalApi.middleware,
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
