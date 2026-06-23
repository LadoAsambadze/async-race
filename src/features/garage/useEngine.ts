import { useCallback, useState } from 'react';
import { useDriveMutation, useToggleEngineMutation } from '../../api/engineApi';
import { useTrackAnimation } from './useTrackAnimation';
import { durationFromEngine, msToSeconds } from '../../utils/helpers';
import type { Car, CarRunState, RaceResult } from '../../types';

interface UseEngineResult {
  runState: CarRunState;
  trackRef: React.RefObject<HTMLDivElement>;
  carRef: React.RefObject<HTMLDivElement>;
  start: () => Promise<RaceResult>;
  stop: () => Promise<void>;
}

export const useEngine = (car: Car): UseEngineResult => {
  const [runState, setRunState] = useState<CarRunState>('idle');
  const { trackRef, carRef, run, freeze, reset } = useTrackAnimation();
  const [toggleEngine] = useToggleEngineMutation();
  const [drive] = useDriveMutation();

  const start = useCallback(async (): Promise<RaceResult> => {
    setRunState('starting');
    let engine;
    try {
      engine = await toggleEngine({ id: car.id, status: 'started' }).unwrap();
    } catch (error) {
      setRunState('idle');
      throw error;
    }
    const duration = durationFromEngine(engine.distance, engine.velocity);
    setRunState('driving');
    const animation = run(duration);
    try {
      await drive(car.id).unwrap();
    } catch (error) {
      freeze();
      setRunState('broken');
      throw error;
    }
    await animation;
    setRunState('finished');
    return { id: car.id, name: car.name, time: msToSeconds(duration) };
  }, [car.id, car.name, drive, freeze, run, toggleEngine]);

  const stop = useCallback(async (): Promise<void> => {
    freeze();
    await toggleEngine({ id: car.id, status: 'stopped' }).unwrap();
    reset();
    setRunState('idle');
  }, [car.id, freeze, reset, toggleEngine]);

  return { runState, trackRef, carRef, start, stop };
};
