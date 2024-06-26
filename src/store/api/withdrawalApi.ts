import { createApi } from '@reduxjs/toolkit/query/react';

import baseQueryWithJWT from './baseApi';

export const withdrawalApi = createApi({
  reducerPath: 'withdrawalApi',
  baseQuery: baseQueryWithJWT,
  endpoints: (builder) => ({
    withdrawal: builder.mutation<void, void>({
      query: () => {
        return {
          url: `/customers`,
          method: 'DELETE',
        };
      },
    }),

    resetUserData: builder.mutation<void, void>({
      query: () => {
        return {
          url: `/customers/reset`,
          method: 'DELETE',
        };
      },
    }),

    policyAgree: builder.mutation<void, void>({
      query: () => {
        return {
          url: `/customers/policy-agree`,
          method: 'PATCH',
        };
      },
    }),
  }),
});

export const {
  useWithdrawalMutation,
  useResetUserDataMutation,
  usePolicyAgreeMutation,
} = withdrawalApi;
