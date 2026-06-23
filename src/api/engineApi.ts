import { baseApi } from './baseApi';
import type { EngineResponse } from '../types';

interface ToggleEngineArgs {
  id: number;
  status: 'started' | 'stopped';
}

interface DriveResponse {
  success: boolean;
}

export const engineApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    toggleEngine: builder.mutation<EngineResponse, ToggleEngineArgs>({
      query: ({ id, status }) => ({
        url: `/engine?id=${id}&status=${status}`,
        method: 'PATCH',
      }),
    }),
    drive: builder.mutation<DriveResponse, number>({
      query: (id) => ({
        url: `/engine?id=${id}&status=drive`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const { useToggleEngineMutation, useDriveMutation } = engineApi;
