import { useCallback, useEffect, useRef } from 'react';
import { animateCar, positionCar } from './carAnimation';

interface TrackAnimation {
  trackRef: React.RefObject<HTMLDivElement>;
  carRef: React.RefObject<HTMLDivElement>;
  run: (duration: number) => Promise<void>;
  freeze: () => void;
  reset: () => void;
}

export const useTrackAnimation = (): TrackAnimation => {
  const trackRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const cancelledRef = useRef(false);

  const apply = useCallback(
    (progress: number) => positionCar(trackRef.current, carRef.current, progress),
    [],
  );

  const freeze = useCallback(() => {
    cancelledRef.current = true;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, []);

  const run = useCallback(
    (duration: number) =>
      animateCar(duration, { rafRef, progressRef, cancelledRef, onFrame: apply }),
    [apply],
  );

  const reset = useCallback(() => {
    freeze();
    progressRef.current = 0;
    apply(0);
  }, [apply, freeze]);

  useEffect(() => {
    const onResize = () => apply(progressRef.current);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [apply]);

  useEffect(() => () => freeze(), [freeze]);

  return { trackRef, carRef, run, freeze, reset };
};
