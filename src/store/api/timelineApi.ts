import { createApi } from '@reduxjs/toolkit/query/react';

import {
  QuestionScoreModel,
  WrongCounterModel,
} from '../../types/questionTypes';
import {
  TimeLineItemModel,
  TimelineListModel,
} from '../../types/timelinetypes';
import baseQueryWithReauth from './baseApi';

export const timelineApi = createApi({
  reducerPath: 'timelineApi',
  tagTypes: ['TimelineList'],
  keepUnusedDataFor: 86400000,
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getTimelineList: builder.query<TimelineListModel[], void>({
      query: () => `/time-lines`,
      providesTags: ['TimelineList'],
    }),
    getTimeline: builder.query<TimeLineItemModel[], number>({
      query: (chapterNumber: number) =>
        `/questions/time-flow/?id=${chapterNumber}`,
    }),
    updateTimelineWrongCounter: builder.mutation<
      QuestionScoreModel[],
      WrongCounterModel
    >({
      query: (counter: WrongCounterModel) => {
        return {
          url: `/timeline/wrong-count`,
          method: 'PATCH',
          body: counter,
        };
      },
      invalidatesTags: ['TimelineList'],
    }),
  }),
});

export const {
  useGetTimelineQuery,
  useGetTimelineListQuery,
  useLazyGetTimelineListQuery,
  useUpdateTimelineWrongCounterMutation,
  usePrefetch,
} = timelineApi;
