import { createApi } from '@reduxjs/toolkit/query/react';

import { SearchModel } from '../../types/commonTypes';
import {
  ContentModel,
  JJHModel,
  ProgressModel,
  UpdateProgressModel,
} from '../../types/jjhTypes';
import {
  BookmarkedTopicListModel,
  TopicListModel,
} from '../../types/topicTypes';
import baseQueryWithJWT from './baseApi';

export const jjhApi = createApi({
  reducerPath: 'jjhApi',
  baseQuery: baseQueryWithJWT,
  tagTypes: ['jjhUpdate', 'Bookmark'],
  keepUnusedDataFor: 86400000,
  endpoints: (builder) => ({
    getJJHList: builder.query<JJHModel, void>({
      query: () => '/jjh',
      providesTags: ['jjhUpdate'],
    }),
    getContentList: builder.query<ContentModel[], number>({
      query: (jjhNumber) => `/jjh/${jjhNumber}/contents-table`,
      providesTags: ['jjhUpdate', 'Bookmark'],
    }),
    getTotalProgress: builder.query<ProgressModel, void>({
      query: () => `/total-progress`,
      providesTags: ['jjhUpdate'],
    }),
    updateProgress: builder.mutation<void, UpdateProgressModel>({
      query: (progress: ContentModel) => {
        return {
          url: `/jjh/progress`,
          method: 'PATCH',
          body: progress,
        };
      },
      invalidatesTags: ['jjhUpdate'],
    }),

    getSearch: builder.query<SearchModel, string>({
      query: (search) => `/search?searchKey=${search}`,
    }),

    getChapterTopicList: builder.query<TopicListModel[], number>({
      query: (chapter) => `/chapters/${chapter}/topics`,
      providesTags: ['Bookmark'],
    }),
    getQuestionCategoryTopicList: builder.query<
      BookmarkedTopicListModel[],
      number
    >({
      query: (id) => `/question-categories/${id}/topics`,
      providesTags: ['Bookmark'],
    }),

    getBookmarkedTopic: builder.query<BookmarkedTopicListModel[], void>({
      query: () => `/topics/bookmarked`,
      providesTags: ['Bookmark'],
    }),

    updateBookmark: builder.mutation<void, string>({
      query: (topicTitle: string) => {
        return {
          url: `/bookmarks`,
          method: 'PATCH',
          body: {
            topicTitle,
          },
        };
      },
      invalidatesTags: ['Bookmark'],
    }),

    deleteBookmark: builder.mutation<void, string>({
      query: (topicTitle: string) => {
        return {
          url: `/bookmarks`,
          method: 'DELETE',
          body: {
            topicTitle,
          },
        };
      },
      invalidatesTags: ['Bookmark'],
    }),
  }),
});

export const {
  useGetJJHListQuery,
  useLazyGetJJHListQuery,
  useGetContentListQuery,
  useLazyGetTotalProgressQuery,
  useLazyGetContentListQuery,
  useUpdateProgressMutation,
  useDeleteBookmarkMutation,
  useGetBookmarkedTopicQuery,
  useGetChapterTopicListQuery,
  useGetQuestionCategoryTopicListQuery,
  useUpdateBookmarkMutation,
  useGetSearchQuery,
  useLazyGetSearchQuery,
} = jjhApi;
