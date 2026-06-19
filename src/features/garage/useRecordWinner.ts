import { useCallback } from 'react';
import {
  useCreateWinnerMutation,
  useLazyGetWinnerQuery,
  useUpdateWinnerMutation,
} from '../../api/winnersApi';
import type { RaceResult } from '../../types';

// Persists a race winner: increment wins and keep the best (smallest) time,
// or create a fresh record when this car has never won before.
export const useRecordWinner = () => {
  const [getWinner] = useLazyGetWinnerQuery();
  const [createWinner] = useCreateWinnerMutation();
  const [updateWinner] = useUpdateWinnerMutation();

  return useCallback(
    async ({ id, time }: RaceResult) => {
      const existing = await getWinner(id)
        .unwrap()
        .catch(() => null);
      if (existing) {
        await updateWinner({ id, wins: existing.wins + 1, time: Math.min(existing.time, time) });
      } else {
        await createWinner({ id, wins: 1, time });
      }
    },
    [createWinner, getWinner, updateWinner],
  );
};
