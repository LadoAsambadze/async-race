import { useCallback, useRef } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { raceFinished, raceReset, raceStarted } from '../race/raceSlice';
import { useRecordWinner } from './useRecordWinner';
import { firstToFinish } from '../../utils/helpers';
import type { CarHandle } from '../../types';

// Coordinates the whole-page race: collects each car's imperative handle,
// starts them together, then announces and persists the first finisher.
export const useRace = () => {
  const dispatch = useAppDispatch();
  const handles = useRef<Map<number, CarHandle>>(new Map());
  const recordWinner = useRecordWinner();

  const register = useCallback((handle: CarHandle) => {
    handles.current.set(handle.id, handle);
  }, []);

  const unregister = useCallback((id: number) => {
    handles.current.delete(id);
  }, []);

  const startRace = useCallback(async () => {
    dispatch(raceStarted());
    const promises = [...handles.current.values()].map((handle) => handle.start());
    try {
      const winner = await firstToFinish(promises);
      dispatch(raceFinished(winner));
      await recordWinner(winner);
    } catch {
      // Every car broke down — there is no winner to announce.
    }
  }, [dispatch, recordWinner]);

  const resetRace = useCallback(async () => {
    await Promise.allSettled([...handles.current.values()].map((handle) => handle.stop()));
    dispatch(raceReset());
  }, [dispatch]);

  return { register, unregister, startRace, resetRace };
};
