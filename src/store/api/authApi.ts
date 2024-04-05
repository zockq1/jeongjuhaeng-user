import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { GetTokenModel, GetTokenParams } from '@/types/authTypes';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getOAuthToken: builder.query<GetTokenModel, GetTokenParams>({
      query: ({ code, local, protocol, serviceType }) =>
        `${import.meta.env.VITE_API_URL}login/${serviceType}?code=${code}&url=${local}&protocol=${protocol}`,
      transformResponse: (response: { id: string; isNew: boolean }, meta) => {
        const accessToken = meta?.response?.headers.get('Authorization');
        const refreshToken = meta?.response?.headers.get('Refresh-Token');
        return {
          id: response.id,
          isNew: response.isNew,
          accessToken: accessToken || '',
          refreshToken: refreshToken || '',
        };
      },
    }),
  }),
});

export const { useGetOAuthTokenQuery } = authApi;
