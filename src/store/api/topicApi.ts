import { createApi } from '@reduxjs/toolkit/query/react';

import { KeywordModel, TopicModel } from '../../types/topicTypes';
import {
  BookmarkedTopicListModel,
  TopicListModel,
} from '../../types/topicTypes';
import baseQueryWithJWT from './baseApi';

export const topicApi = createApi({
  reducerPath: 'topicApi',
  baseQuery: baseQueryWithJWT,
  keepUnusedDataFor: 86400000,
  endpoints: (builder) => ({
    getTopic: builder.query<TopicModel, string>({
      query: (title) => `/topics/${title}`,
    }),
    getKeywordList: builder.query<KeywordModel[], string>({
      query: (title) => `/topics/${title}/keywords`,
    }),
    getChapterTopicList: builder.query<TopicListModel[], number>({
      query: (chapter) => `/chapters/${chapter}/topics`,
    }),
    getQuestionCategoryTopicList: builder.query<
      BookmarkedTopicListModel[],
      number
    >({
      query: (id) => `/question-categories/${id}/topics`,
    }),
  }),
});

export const {
  useGetTopicQuery,
  useGetKeywordListQuery,
  useGetChapterTopicListQuery,
  useGetQuestionCategoryTopicListQuery,
  usePrefetch,
} = topicApi;
