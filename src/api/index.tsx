import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://test.gefara.xyz/api/v1/'}),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({page, search, orderBy}) => ({
        url: `user/list`,
        params: {
          page, search, orderBy
        }
      })
    }),
    getTransactions: builder.query({
      query: ({user}) => `user/${user}/transactions`
    })
  }),
})

export const {
  useGetUsersQuery,
  useGetTransactionsQuery
} = api
