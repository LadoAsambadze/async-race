export interface Car {
  id: number;
  name: string;
  color: string;
}

export interface CarDraft {
  name: string;
  color: string;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface WinnerView extends Winner {
  name: string;
  color: string;
}

export interface EngineResponse {
  velocity: number;
  distance: number;
}

export type CarRunState = 'idle' | 'starting' | 'driving' | 'finished' | 'broken';

export interface PaginatedResult<T> {
  data: T[];
  totalCount: number;
}

export interface RaceResult {
  id: number;
  name: string;
  time: number;
}

export interface CarHandle {
  id: number;
  start: () => Promise<RaceResult>;
  stop: () => Promise<void>;
}

export type WinnersSortField = 'id' | 'wins' | 'time';
export type SortOrder = 'asc' | 'desc';
