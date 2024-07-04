import { createApi } from '@reduxjs/toolkit/query/react';

import { SearchModel } from '../../types/commonTypes';
import {
  ContentModel,
  JJHModel,
  ProgressModel,
  UpdateProgressModel,
} from '../../types/jjhTypes';
import baseQueryWithJWT from './baseApi';

export const jjhApi = createApi({
  reducerPath: 'jjhApi',
  baseQuery: baseQueryWithJWT,
  tagTypes: ['jjhUpdate'],
  keepUnusedDataFor: 86400000,
  endpoints: (builder) => ({
    getJJHList: builder.query<JJHModel, void>({
      query: () => '/jjh',
      providesTags: ['jjhUpdate'],
    }),
    getContentList: builder.query<ContentModel[], number>({
      query: (jjhNumber) => `/jjh/${jjhNumber}/contents-table`,
      providesTags: ['jjhUpdate'],
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
  }),
});

export const {
  useGetJJHListQuery,
  useLazyGetJJHListQuery,
  useGetContentListQuery,
  useLazyGetTotalProgressQuery,
  useLazyGetContentListQuery,
  useUpdateProgressMutation,
  useGetSearchQuery,
  useLazyGetSearchQuery,
  usePrefetch,
} = jjhApi;
