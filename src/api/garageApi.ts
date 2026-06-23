import type { FetchBaseQueryMeta } from '@reduxjs/toolkit/query';
import { baseApi } from './baseApi';
import { readTotalCount } from './totalCount';
import type { Car, CarDraft, PaginatedResult } from '../types';

interface GetCarsArgs {
  page: number;
  limit: number;
}

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
    createCar: builder.mutation<Car, CarDraft>({
      query: (body) => ({ url: '/garage', method: 'POST', body }),
      invalidatesTags: ['Car'],
    }),
    updateCar: builder.mutation<Car, Car>({
      query: ({ id, ...body }) => ({ url: `/garage/${id}`, method: 'PUT', body }),
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
