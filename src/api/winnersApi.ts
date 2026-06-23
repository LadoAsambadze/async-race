import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { baseApi } from './baseApi';
import { readTotalCount } from './totalCount';
import { FALLBACK_CAR_COLOR } from '../constants';
import type {
  Car,
  PaginatedResult,
  SortOrder,
  Winner,
  WinnersSortField,
  WinnerView,
} from '../types';

type CarFetcher = (id: number) => Promise<{ data?: unknown; error?: FetchBaseQueryError }>;

interface GetWinnersArgs {
  page: number;
  limit: number;
  sort: WinnersSortField;
  order: SortOrder;
}

const enrichWinners = async (winners: Winner[], fetchCar: CarFetcher): Promise<WinnerView[]> =>
  Promise.all(
    winners.map(async (winner) => {
      const result = await fetchCar(winner.id);
      const car = result.data as Car | undefined;
      return {
        ...winner,
        name: car?.name ?? 'Unknown',
        color: car?.color ?? FALLBACK_CAR_COLOR,
      };
    }),
  );

export const winnersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWinners: builder.query<PaginatedResult<WinnerView>, GetWinnersArgs>({
      async queryFn({ page, limit, sort, order }, _api, _extra, baseQuery) {
        const url = `/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;
        const result = await baseQuery(url);
        if (result.error) return { error: result.error };
        const winners = result.data as Winner[];
        const totalCount = readTotalCount(result.meta);
        const data = await enrichWinners(winners, async (id) => baseQuery(`/garage/${id}`));
        return { data: { data, totalCount } };
      },
      providesTags: ['Winner'],
    }),
    getWinner: builder.query<Winner, number>({
      query: (id) => `/winners/${id}`,
    }),
    createWinner: builder.mutation<Winner, Winner>({
      query: (body) => ({ url: '/winners', method: 'POST', body }),
      invalidatesTags: ['Winner'],
    }),
    updateWinner: builder.mutation<Winner, Winner>({
      query: ({ id, ...body }) => ({ url: `/winners/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Winner'],
    }),
    deleteWinner: builder.mutation<void, number>({
      query: (id) => ({ url: `/winners/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Winner'],
    }),
  }),
});

export const {
  useGetWinnersQuery,
  useLazyGetWinnerQuery,
  useCreateWinnerMutation,
  useUpdateWinnerMutation,
  useDeleteWinnerMutation,
} = winnersApi;
