import type { MutableRefObject } from 'react';

export const positionCar = (
  lane: HTMLDivElement | null,
  carEl: HTMLDivElement | null,
  progress: number,
): void => {
  if (!lane || !carEl) return;
  const travel = lane.clientWidth - carEl.clientWidth;
  carEl.style.setProperty('transform', `translateX(${Math.max(0, progress * travel)}px)`);
};

interface AnimationRefs {
  rafRef: MutableRefObject<number | null>;
  progressRef: MutableRefObject<number>;
  cancelledRef: MutableRefObject<boolean>;
  onFrame: (progress: number) => void;
}

export const animateCar = (duration: number, refs: AnimationRefs): Promise<void> =>
  new Promise<void>((resolve, reject) => {
    const { rafRef, progressRef, cancelledRef, onFrame } = refs;
    cancelledRef.current = false;
    const startTime = performance.now();
    const tick = (now: number): void => {
      if (cancelledRef.current) return reject(new Error('cancelled'));
      const progress = Math.min((now - startTime) / duration, 1);
      progressRef.current = progress;
      onFrame(progress);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
      else resolve();
      return undefined;
    };
    rafRef.current = requestAnimationFrame(tick);
  });
