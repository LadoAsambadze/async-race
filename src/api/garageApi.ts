import type { FetchBaseQueryMeta } from '@reduxjs/toolkit/query';
import { baseApi } from './baseApi';
import type { Car, CarDraft, PaginatedResult } from '../types';

const TOTAL_COUNT_HEADER = 'X-Total-Count';

interface GetCarsArgs {
  page: number;
  limit: number;
}

const readTotalCount = (meta: FetchBaseQueryMeta | undefined): number =>
  Number(meta?.response?.headers.get(TOTAL_COUNT_HEADER) ?? 0);

export const garageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCars: builder.query<PaginatedResult<Car>, GetCarsArgs>({
      query: ({ page, limit }) => `/garage?_page=${page}&_limit=${limit}`,
      transformResponse: (data: Car[], meta: FetchBaseQueryMeta | undefined) => ({
        data,
        totalCount: readTotalCount(meta),
      }),
      providesTags: ['Car'],
    }),
    getCar: builder.query<Car, number>({
      query: (id) => `/garage/${id}`,
    }),
    createCar: builder.mutation<Car, CarDraft>({
      query: (body) => ({ url: '/garage', method: 'POST', body }),
      invalidatesTags: ['Car'],
    }),
    updateCar: builder.mutation<Car, Car>({
      query: ({ id, ...body }) => ({ url: `/garage/${id}`, method: 'PUT', body }),
      // Name/colour also appears in the winners table, so refresh both.
      invalidatesTags: ['Car', 'Winner'],
    }),
    deleteCar: builder.mutation<void, number>({
      query: (id) => ({ url: `/garage/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Car', 'Winner'],
    }),
  }),
});

export const { useGetCarsQuery, useCreateCarMutation, useUpdateCarMutation, useDeleteCarMutation } =
  garageApi;
