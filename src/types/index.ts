// Domain models and shared types used across the whole app.

export interface Car {
  id: number;
  name: string;
  color: string;
}

// Payload for creating/updating a car (server assigns the id).
export interface CarDraft {
  name: string;
  color: string;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

// Winner enriched with the car's name and color for display.
export interface WinnerView extends Winner {
  name: string;
  color: string;
}

export interface EngineResponse {
  velocity: number;
  distance: number;
}

export type EngineStatus = 'started' | 'stopped' | 'drive';

// Lifecycle of a single car on the track.
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

// Imperative controls a CarItem exposes so the race orchestrator can
// start/stop every car on the page.
export interface CarHandle {
  id: number;
  start: () => Promise<RaceResult>;
  stop: () => Promise<void>;
}

export type WinnersSortField = 'id' | 'wins' | 'time';
export type SortOrder = 'asc' | 'desc';
