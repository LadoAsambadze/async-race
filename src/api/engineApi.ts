import { baseApi } from './baseApi';
import { ENGINE_STATUS } from '../constants';
import type { EngineResponse } from '../types';

type ToggleStatus = typeof ENGINE_STATUS.STARTED | typeof ENGINE_STATUS.STOPPED;

interface ToggleEngineArgs {
  id: number;
  status: ToggleStatus;
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
        url: `/engine?id=${id}&status=${ENGINE_STATUS.DRIVE}`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const { useToggleEngineMutation, useDriveMutation } = engineApi;
