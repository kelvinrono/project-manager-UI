import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../constants/constants';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (newUser) => ({
        url: '/auth/register',
        method: 'POST',
        body: newUser,
      }),
      transformErrorResponse: (response, meta) => {
        if (!meta.response.ok) {
          throw new Error(response.message || 'Registration failed');
        }
        return response;
    },
    }),
    getProducts: builder.query({
      query: () => 'products',
    }),
  }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetProductsQuery
} = apiSlice;
