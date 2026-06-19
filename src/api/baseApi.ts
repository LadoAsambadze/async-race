import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../constants';

// Single RTK Query API instance. Endpoints are injected per-domain
// (garage / winners / engine) to keep concerns separated.
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Car', 'Winner'],
  endpoints: () => ({}),
});
