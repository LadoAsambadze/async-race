import { MS_PER_SECOND, TIME_DECIMALS } from '../constants';
import type { RaceResult } from '../types';

// Convert engine distance/velocity into a duration in milliseconds.
export const durationFromEngine = (distance: number, velocity: number): number =>
  distance / velocity;

export const msToSeconds = (ms: number): number =>
  Number((ms / MS_PER_SECOND).toFixed(TIME_DECIMALS));

export const totalPages = (totalCount: number, perPage: number): number =>
  Math.max(1, Math.ceil(totalCount / perPage));

// Resolve the first promise that fulfils; reject only when every promise rejects.
// Used to find the race winner (the first car to reach the finish line).
export const firstToFinish = (promises: Promise<RaceResult>[]): Promise<RaceResult> =>
  new Promise<RaceResult>((resolve, reject) => {
    let rejected = 0;
    promises.forEach((promise) => {
      promise.then(resolve).catch(() => {
        rejected += 1;
        if (rejected === promises.length) {
          reject(new Error('all-cars-broke'));
        }
      });
    });
  });
