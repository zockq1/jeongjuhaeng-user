import { createApi } from '@reduxjs/toolkit/query/react';

import {
  ExamModel,
  GetQuizModel,
  QuestionCategoryModel,
  QuestionScoreModel,
  QuizModel,
  RoundModel,
  UpdateWrongQuestionModel,
  WrongCounterModel,
  WrongQuestionListModel,
} from '../../types/questionTypes';
import baseQueryWithJWT from './baseApi';

export const questionApi = createApi({
  reducerPath: 'questionApi',
  baseQuery: baseQueryWithJWT,

  keepUnusedDataFor: 86400000,
  tagTypes: ['Score', 'Exam', 'WrongNote', 'Quiz'],
  endpoints: (builder) => ({
    getRoundList: builder.query<RoundModel[], void>({
      query: () => '/rounds',
      providesTags: ['Exam'],
    }),
    getTtoKQuestion: builder.query<QuizModel[], string>({
      query: (topicTitle: string) =>
        `/questions/get-keywords/?title=${topicTitle}`,
      providesTags: ['Quiz'],
    }),
    getKtoTQuestion: builder.query<QuizModel[], number>({
      query: (chapterNumber: number) =>
        `/questions/get-topics-keywords/?num=${chapterNumber}`,
      providesTags: ['Quiz'],
    }),
    getRandomQuestion: builder.query<QuizModel[], GetQuizModel>({
      query: (getQuestion) =>
        `/questions/random?id=${getQuestion.id}&count=${getQuestion.numberOfQuestion}`,
    }),
    getExam: builder.query<ExamModel[], number>({
      query: (roundNumber: number) => `/rounds/${roundNumber}/questions`,
      providesTags: ['WrongNote'],
    }),
    getQuestionCategoryList: builder.query<QuestionCategoryModel[], void>({
      query: () => `/question-categories`,
    }),

    getWrongExamList: builder.query<WrongQuestionListModel[], void>({
      query: () => `/rounds/answer-notes`,
      providesTags: ['Exam', 'WrongNote'],
    }),

    updateKeywordWrongCounter: builder.mutation<
      QuestionScoreModel[],
      WrongCounterModel[]
    >({
      query: (counterList: WrongCounterModel[]) => {
        return {
          url: `/keyword/wrong-count`,
          method: 'PATCH',
          body: counterList,
        };
      },
      invalidatesTags: ['Score'],
    }),
    updateExamWrongCounter: builder.mutation<
      QuestionScoreModel[],
      UpdateWrongQuestionModel[]
    >({
      query: (counterList: UpdateWrongQuestionModel[]) => {
        return {
          url: `/questions/record`,
          method: 'PATCH',
          body: counterList,
        };
      },
      invalidatesTags: ['Exam', 'WrongNote'],
    }),
    updateExamClear: builder.mutation<void, number>({
      query: (roundNumber) => {
        return {
          url: `/rounds/${roundNumber}/clear`,
          method: 'PATCH',
        };
      },
      invalidatesTags: ['Exam'],
    }),
    deleteWrongNote: builder.mutation<void, number>({
      query: (questionId: number) => {
        return {
          url: `/answer-notes`,
          method: 'Delete',
          body: {
            questionId,
          },
        };
      },
      invalidatesTags: ['WrongNote'],
    }),
  }),
});

export const {
  useGetRoundListQuery,
  useGetExamQuery,
  useGetRandomQuestionQuery,
  useGetKtoTQuestionQuery,
  useGetTtoKQuestionQuery,
  useGetQuestionCategoryListQuery,
  useUpdateKeywordWrongCounterMutation,
  useGetWrongExamListQuery,
  useUpdateExamWrongCounterMutation,
  useUpdateExamClearMutation,
  useDeleteWrongNoteMutation,
  usePrefetch,
} = questionApi;
