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
    // Start or stop the engine; returns velocity + distance to compute duration.
    toggleEngine: builder.mutation<EngineResponse, ToggleEngineArgs>({
      query: ({ id, status }) => ({
        url: `/engine?id=${id}&status=${status}`,
        method: 'PATCH',
      }),
    }),
    // Switch to drive mode. Resolves on success, errors (500) when the engine breaks.
    drive: builder.mutation<DriveResponse, number>({
      query: (id) => ({
        url: `/engine?id=${id}&status=drive`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const { useToggleEngineMutation, useDriveMutation } = engineApi;
